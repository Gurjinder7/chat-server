import type {Request, Response, NextFunction} from "express";
import {generateToken, verifyRefreshToken, verifyToken} from "../services/tokenService.ts";
import {getUSerHash} from "../repository/userRepo.ts";

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    console.log('headers', req.headers);
    console.log(req.cookies)

    const authToken = req.headers.authorization ?? null;

    if (!authToken) {
        return res.status(401).json({
            status: "error",
            message: "No token provided",
        })
    }

    // try {
        let tokenData, refreshTokenData:string;

        await verifyToken(authToken.split(' ')[1]).then(res => {
            console.log('TokenData',res)
            tokenData = res.data;
        }).catch(e => {
            console.error(e);
        })

        if(!tokenData) {

            await verifyRefreshToken(req.headers.cookie.split('=')[1]).then(res => {
                console.log("RefreshToken",res.data)
                refreshTokenData = res.data

            }).catch(e => {
                console.error(e);
            })
        }

        console.log('tokenData',tokenData);
        console.log('refreshTokenData',refreshTokenData);
        if(!refreshTokenData && !tokenData) {
            return res.status(401).json({
                status: "error",
                message: "Invalid token",
            })
        }


        const username = tokenData ? tokenData : refreshTokenData;

        const userData = await getUSerHash(username)
       // console.log(userData)
        if (userData.rowCount) {
            if(tokenData) {
                next()
            } else {
                return res.status(403).json({
                    status: "Forbidden",
                    authToken: await generateToken(username),
                })
            }
        } else {
            return res.status(401).json({
                status: "error",
                message: "Invalid token",
            })
        }

   // } catch (e) {
    // NEEDS TO DO BETTER HANDLING OF ERRORS!
    //    return res.status(500).json({
    //        status: "error",
    //        message: "something went wrong",
    //        // error: e,
    //    })
   // }

}