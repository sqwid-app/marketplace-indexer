import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { DataHandlerContext, SubstrateBatchProcessor } from "@subsquid/substrate-processor";
import { KnownArchives, lookupArchive } from "@subsquid/archive-registry";
import { EventManager } from "./process/EventManager";

// TODO: Remove Pusher
import Pusher from "pusher";
let pusher: Pusher;
const PUSHER_CHANNEL = process.env.PUSHER_CHANNEL;
const PUSHER_EVENT = process.env.PUSHER_EVENT;
if (process.env.PUSHER_ENABLED === 'true' && PUSHER_CHANNEL && PUSHER_EVENT) {
  pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.PUSHER_CLUSTER || "eu",
    useTLS: true
  });
  console.log('  Pusher enabled\n');
} else {
  console.log('  Pusher disabled\n');
}

// TODO: Add FirebaseDB

const network = process.env.NETWORK;
if (!network) throw new Error('Network not set in environment.')
const RPC_URL = process.env[`NODE_RPC_WS_${network.toUpperCase()}`];
const AQUARIUM_ARCHIVE_NAME = process.env[`ARCHIVE_LOOKUP_NAME_${network.toUpperCase()}`] as KnownArchives;
const ARCHIVE = lookupArchive(AQUARIUM_ARCHIVE_NAME, { release: 'ArrowSquid' });
const START_BLOCK = parseInt(process.env.START_BLOCK || '1') || 1;
export const MARKET_CONTRACT_ADDRESS = process.env.MARKET_CONTRACT_ADDRESS as string;
export const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS as string;

console.log(`
  Network: ${network}
  RPC URL: ${RPC_URL}
  Marketplace contract: ${MARKET_CONTRACT_ADDRESS}
  NFT contract: ${NFT_CONTRACT_ADDRESS}
  Archive: ${ARCHIVE}
  Start block: ${START_BLOCK}
`);

const database = new TypeormDatabase();
const fields = { // TODO check if all fields are needed
  event: {
    phase: true,
  },
  extrinsic: {
    signature: true,
    success: true,
    error: true,
    hash: true,
    version: true,
  },
  call: {
    name: true,
    args: true,
  },
  block: {
    timestamp: true,
    stateRoot: true,
    extrinsicsRoot: true,
    validator: true,
  }
};
export type Fields = typeof fields;

const processor = new SubstrateBatchProcessor()
  .setBlockRange({ from: START_BLOCK })
  .setDataSource({ chain: { url: RPC_URL!, rateLimit: 10 }, archive: ARCHIVE })
  .addEvmLog({ address: [MARKET_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS], extrinsic: true })
  .setFields(fields);

export let ctx: DataHandlerContext<Store, Fields>;

// Avoid type errors when serializing BigInts
(BigInt.prototype as any).toJSON = function () { return this.toString(); };

processor.run(database, async (ctx_) => {
  ctx = ctx_;
  const eventManager = new EventManager();
 
  const firstBlock = ctx.blocks[0].header.height;
  const lastBlock = ctx.blocks[ctx.blocks.length - 1].header.height;

  // Iterate over available blocks
  for (const block of ctx.blocks) {
    ctx.log.info(`Processing block ${block.header.height} [${firstBlock} - ${lastBlock}]`);
    // Process events
    for (const event of block.events) {
      if (event.name === 'EVM.Log') {
        await eventManager.process(event);
      } else {
        ctx.log.error(`Unknown event ${event.name}`);
      }
    }
  }

  // Persist processed data
  ctx.log.info(`Saving blocks from ${firstBlock} to ${lastBlock}`);
  await eventManager.save();

  // TODO remove Pusher
  if (pusher) {
    pusher.trigger(PUSHER_CHANNEL!, PUSHER_EVENT!, {
      blockHeight: ctx.blocks[ctx.blocks.length - 1].header.height,
      events: Array.from(eventManager.topics)
    });
  }
  
});