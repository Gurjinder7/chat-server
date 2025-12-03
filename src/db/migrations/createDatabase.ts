import pkg from "pg"

const { Client } = pkg;

const connectionString = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}`;

console.log(connectionString);
const createDatabaseClient = new Client({
    connectionString: connectionString,
})

export const createDatabase = async () => {

    try {
        await createDatabaseClient.connect()

        const res = await createDatabaseClient.query(
            `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${process.env.PG_DATABASE}'`
        );

        // console.log(res)
        if (res.rowCount === 0) {
            console.log(`${process.env.PG_DATABASE} database not found, creating it.`);
            await createDatabaseClient.query(`CREATE DATABASE "${process.env.PG_DATABASE}"`);
            console.log(`Created database ${process.env.PG_DATABASE}`);
        } else {
            console.log(`${process.env.PG_DATABASE} database already exists.`);
        }
        // await createDatabaseClient.query(`CREATE TABLE IF NOT EXISTS "chat_app_db"`)
        // console.log('DATABASE CREATE TABLE')
    }
    catch (error) {
        console.log("ERROR1",error)
        throw error;
    }
    finally {
        await createDatabaseClient.end()
    }

}