# Sqwid marketplace processor

[Squid](https://docs.subsquid.io/) for the Reef Chain [Sqwid marketplace](https://sqwid.app/).

This project has been created with the [Reef EVM event processor template](https://github.com/reef-chain/subsquid-evm-event-processor).

## Quickstart

- Create a `.env` file with the contents of `.env.sample`.

- Start Docker and run the following commands:

```bash
# 1. Install dependencies
npm install

# 2. Compile typescript files
make build

# 3. Start target Postgres database and detach
#    DB will be available at localhost:23799/evm_events
make up

# 4. Start the processor
make process

# 5. In a separate terminal, start graphql server
#    GraphQL API will be available at http://localhost:4350/graphql
make serve

# 6. Stop and destroy target Postgres database
make down
```

## Dev flow

### 1. Define database schema

Delete migration files from `db/migrations` directory and define the schema of the target database via `schema.graphql` file, replacing the sample definition.
Schema definition consists of regular graphql type declarations annotated with custom directives.
Full description of `schema.graphql` dialect is available [here](https://docs.subsquid.io/sdk/reference/schema-file/).

### 2. Generate TypeORM classes

Mapping developers use TypeORM [EntityManager](https://typeorm.io/#/working-with-entity-manager)
to interact with target database during data processing. All necessary entity classes are
generated by the squid framework from `schema.graphql`. This is done by running the following command:

```bash
make codegen
```

### 3. Import ABI contract and generate interfaces to decode events

It is necessary to import the respective ABI definition to decode EVM logs.

Delete all the contents in `src/abi` and insert the JSON ABI definition of the contract to index.

To generate a type-safe facade class to decode EVM logs execute the following command:

```bash
npx squid-evm-typegen src/abi src/abi/{YOUR_CONTRACT_NAME}.json
```

And replace the following code in generated the generated `abi.support.ts` file:

```ts
let result = await this._chain.client.call('eth_call', [
      { to: this.address, data },
      '0x' + this.blockHeight.toString(16)
])
```
by

```ts
let result = await this._chain.client.call('evm_call', [
      {to: this.address, data, from: undefined, storageLimit: 0}
])
```

## Project conventions

Squid tools assume a certain project layout.

* All compiled js files must reside in `lib` and all TypeScript sources in `src`.
The layout of `lib` must reflect `src`.
* All TypeORM classes must be exported by `src/model/index.ts` (`lib/model` module).
* Database schema must be defined in `schema.graphql`.
* Database migrations must reside in `db/migrations` and must be plain js files.
* `sqd(1)` and `squid-*(1)` executables consult `.env` file for a number of environment variables.

## Graphql server extensions

It is possible to extend `squid-graphql-server(1)` with custom
[type-graphql](https://typegraphql.com) resolvers and to add request validation.
More details will be added later.

## Deployment

### Deploy a Squid

* To deploy a Squid execute `sqd deploy -m <path_to_manifest_file>`.