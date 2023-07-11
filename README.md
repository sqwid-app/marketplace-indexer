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