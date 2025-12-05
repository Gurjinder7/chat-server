import {db} from "../../db/index.ts";
import {chatSchema} from "../services/zodSchema.service.ts";


const getChatId = async (firstUser: string, otherUser: string) => {
    return await db.query(`SELECT * FROM chats WHERE (firstuser = '${firstUser}' AND seconduser = '${otherUser}') 
                       OR (firstuser = '${otherUser}' AND seconduser = '${firstUser}')`)
}

const getChats = async( chatId: number) => {
    return await db.query(`Select * from messages where chatId = '${chatId}'`)
}

const createChat = async (firstUser:string, secondUser:string, firstSender:string)  => {
    return await db.query(`INSERT into chats(firstuser, seconduser, firstsender,created) VALUES
                                                                  ('${firstUser}','${secondUser}','${firstSender}', current_timestamp)
                                                                  RETURNING *`)
}
export {getChats, getChatId, createChat}