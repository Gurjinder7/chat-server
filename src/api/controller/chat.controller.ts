import type {Response, Request} from "express";
import {chatSchema, checkSchema, userSchema} from "../services/zodSchema.service.ts";
import {CHAT, USER} from "../../utils/constant.ts";
import {ZodError} from "zod";
import {createChat, getChatId, getChats} from "../repository/chat.repository.ts";
import type {QueryResult} from "pg";
import {createSocketConnection} from "../services/webSocket.service.ts";

const chatController = {
    getChat: async (req: Request, res: Response) => {
        const { user, otherUser } = req.body;

        console.log('CHARTTTT', req.body)
        const schemaCheck: chatSchema | ZodError = checkSchema(req.body, CHAT);
        if(schemaCheck instanceof  ZodError) {
            return res.status(400).json(schemaCheck);
        }

        // check if chat id exists
        let chatQuery:QueryResult;
        try {
            chatQuery = await getChatId(user, otherUser);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        let chatData, chats:QueryResult;

        console.log('QUERY', chatQuery)
        if (chatQuery.rowCount) {
            chatData = chatQuery.rows[0];
        } else {
            // create new chatId
            console.log('HEEEEEY')
            await createChat(user, otherUser, user).then( result => {
                // return res.status(200).json({
                //     chatInfo: result,
                //     chats: [],
                // });
                console.log('RESULT', result);
                chatData = result;
            }).catch(err => {
                console.error('YOOOOO', err);
                return res.status(500).json(err);
            })
        }

        console.log('CHATDATA',chatData);
        console.log('CHATS',chats)
        if(chatData) {
          try {
              chats = await getChats(chatData.chatid)
              createSocketConnection(`ws://localhost:3000/chats/${chatData.chatId}`)

          }
          catch(err) {
              return res.status(500).json(err);
          }
        }

        return res.status(200).json({
            chatInfo: chatData,
            chats: chats.rows,
        });
        // if yes, then get all messages and send back

    }
}

export default chatController;