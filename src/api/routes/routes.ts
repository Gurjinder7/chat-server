import express from "express";
import * as controller from "../controller/index.ts"
import * as mWare from "../middlewares/index.ts";
const router = express.Router();

// **** Open routes ****
router.post("/login", mWare.validateToken, controller.auth.login)
router.post("/register", mWare.validateToken, controller.auth.register)


// **** Protected routes ****

// auth


// users


// chats



export default router;