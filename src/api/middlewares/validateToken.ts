import type {Request, Response, NextFunction} from "express";
import {verifyToken} from "../services/tokenService.ts";
import {getUSerHash} from "../repository/userRepo.ts";

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    console.log('headers', req.headers);

    const authToken = req.headers.authorization ?? null;

    if (!authToken) {
        return res.status(401).json({
            status: "error",
            message: "No token provided",
        })
    }

    let tokenData:string;
    verifyToken(authToken.split(' ')[1]).then(res => {
        console.log(res)
        tokenData = res;

    }).catch(err => {
        console.log(err)
        return res.status(401).json({
            status: "error",
            message: "Invalid token",
            error: err,
        })
    })

   try {
        const userData = await getUSerHash(tokenData)
        if (userData.rows) {
            next()
        } else {
            return res.status(401).json({
                status: "error",
                message: "Invalid token",
            })
        }
   } catch (e) {
       return res.status(500).json({
           status: "error",
           message: e.message,
           error: e,
       })
   }

}