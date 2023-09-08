import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
} from "@subsquid/substrate-processor";
import { KnownArchives, lookupArchive } from "@subsquid/archive-registry";
import { EventRaw } from "./interfaces/interfaces";
import { EventManager } from "./process/EventManager";
import Pusher from "pusher";

const RPC_URL = process.env.NODE_RPC_WS;
const AQUARIUM_ARCHIVE_NAME = process.env.ARCHIVE_LOOKUP_NAME as KnownArchives;
export const MARKET_CONTRACT_ADDRESS = process.env.MARKET_CONTRACT_ADDRESS as string;
export const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS as string;
const ARCHIVE = lookupArchive(AQUARIUM_ARCHIVE_NAME);
const START_BLOCK = parseInt(process.env.START_BLOCK || '1') || 1;
const PUSHER_CHANNEL = process.env.PUSHER_CHANNEL;
const PUSHER_EVENT = process.env.PUSHER_EVENT;
console.log(`\nRPC URL: ${RPC_URL}
  \nMarketplace contract: ${MARKET_CONTRACT_ADDRESS}
  \nNFT contract: ${NFT_CONTRACT_ADDRESS}
  \nArchive: ${ARCHIVE}
  \nStart block: ${START_BLOCK}\n`);

const database = new TypeormDatabase();
const processor = new SubstrateBatchProcessor()
  .setBlockRange({ from: START_BLOCK })
  .setDataSource({ chain: RPC_URL, archive: ARCHIVE })
  .addEvmLog(MARKET_CONTRACT_ADDRESS, {
    data: { event: { args: true, extrinsic: true } }
  })
  .addEvmLog(NFT_CONTRACT_ADDRESS, {
    data: { event: { args: true, extrinsic: true } }
  });

let pusher: Pusher;
if (process.env.PUSHER_ENABLED === 'true' && PUSHER_CHANNEL && PUSHER_EVENT) {
  pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.PUSHER_CLUSTER || "eu",
    useTLS: true
  });
  console.log('Pusher enabled\n');
} else {
  console.log('Pusher disabled\n');
}

export type Item = BatchProcessorItem<typeof processor>;
export type Context = BatchContext<Store, Item>;
export let ctx: Context;

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
    for (const item of block.items) {
      if (item.name === 'EVM.Log') {
        const eventRaw = item.event as EventRaw;
        await eventManager.process(eventRaw, block.header);
      }
    }
  }

  // Persist processed data
  ctx.log.info(`Saving blocks from ${firstBlock} to ${lastBlock}`);
  await eventManager.save();

  // Push data to Pusher
  if (pusher) {
    pusher.trigger(PUSHER_CHANNEL!, PUSHER_EVENT!, {
      blockHeight: ctx.blocks[ctx.blocks.length - 1].header.height,
      events: Array.from(eventManager.topics)
    });
  }
  
});