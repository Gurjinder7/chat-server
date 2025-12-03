// perform queries on user tables

import {db} from "../../db/index.ts";

const getUSerHash = async (user): Promise<any> => {
    return await db.query(`SELECT * FROM users WHERE username = '${user}'`)
}

const saveUser = async (name:string, username: string, password: string): Promise<any> => {
    return await db.query(`INSERT INTO users(name, username, password, created) VALUES ('${name}', '${username}', '${password}', current_timestamp)`)
}

export {getUSerHash, saveUser}