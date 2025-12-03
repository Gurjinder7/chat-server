import pkg from 'pg'


const { Pool } = pkg

export const db = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: Number(process.env.PG_PORT),
    host: process.env.PG_HOST
})

db.connect()
.then((client) => {
    console.log('Database Connected')
    client.release()
})
.catch((err) => {
    console.error(err)
})

db.on('error', (err) => {
    console.error(err)
})
