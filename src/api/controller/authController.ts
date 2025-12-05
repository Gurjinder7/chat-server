import type {Request, Response} from "express";
import {comparePassword, generatePassword} from "../services/hashService.ts";
import {generateRefreshToken, generateToken} from "../services/tokenService.ts";
import {getUSerHash, saveUser} from "../repository/userRepo.ts";
import {checkSchema, userSchema} from "../services/zodSchema.service.ts";
import {ZodError} from "zod";
import {USER} from "../../utils/constant.ts";


const authController = {
    login : async (req: Request, res: Response) => {
        const { username, password } = req.body;

        const schemaCheck : userSchema | ZodError = checkSchema(req.body, USER);

        console.log(schemaCheck);
        if(schemaCheck instanceof  ZodError){
            return res.status(400).send(schemaCheck);
        }

        const user = await getUSerHash(username);

        console.log('USER', user)

        if (!user) {
            return res.status(400).send("User or password is incorrect!");
        }


        let authToken, refreshToken: string = null
        // match hash and password
        try {

            const isTruePassword = await comparePassword(password, user?.rows[0]?.password);

            // if match, generate a auth token
            if (!isTruePassword) {
                return res.status(400).send("Password is incorrect!");
            }

            authToken = await generateToken(username);
            refreshToken = await generateRefreshToken(username);

            console.log(authToken)
        } catch (error) {
            console.log('ERROR',error);
            return res.status(400).send("Wrong username or password!");
        }

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res.status(200).json({
            authToken,
            refreshToken
        })
    },
    register :async (req: Request, res: Response) => {
        const { name, username, password } = req.body;

        if (!name || !username || !password) {
            return res.status(400).send("Please fill in all fields!");
        }
        let pass = null
        let user = null
        try {
            pass = await generatePassword(password)
            if (pass) {
                user = await saveUser(name, username, pass);
            }
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                message: 'Something went wrong!',
                error: e
            });
        }
        console.log(password, pass)
        if(user?.rowCount > 0) {
            return res.status(200).json({name: name, username:username, message: 'Registered successfully'});

        }

    }
}


export default authController;