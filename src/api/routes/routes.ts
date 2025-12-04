import express from "express";
import * as controller from "../controller/index.ts"
import * as mWare from "../middlewares/index.ts";
import {verifyToken} from "../services/tokenService.ts";
const router = express.Router();

// **** Open routes ****
router.post("/login", controller.auth.login)
router.post("/register", controller.auth.register)


// **** Protected routes ****
router.get("/chats", mWare.validateToken, (req, res) => {
    console.log(req.body)


    res.status(200).send(req.body)
})
// auth


// users


// chats



export default router;