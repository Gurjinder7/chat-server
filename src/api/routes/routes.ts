import express from "express";
import * as controller from "../controller/index.ts"
import * as mWare from "../middlewares/index.ts";
import {verifyToken} from "../services/tokenService.ts";
const router = express.Router();

// **** Open routes ****
router.post("/login", controller.auth.login)
router.post("/register", controller.auth.register)


// **** Protected routes ****
router.get("/chats", mWare.validateToken, controller.chat.getChat)
// auth


// users


// chats



export default router;