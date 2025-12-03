import pkg from "pg"

const { Client } = pkg;

const connectionString = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${}:${}`