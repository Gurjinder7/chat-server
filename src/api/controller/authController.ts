import type {Request, Response} from "express";
import {comparePassword, generatePassword} from "../services/hashService.ts";
import {generateToken} from "../services/tokenService.ts";
import {getUSerHash, saveUser} from "../repository/userRepo.ts";

const authController = {
    login : async (req: Request, res: Response) => {
        const { username, password } = req.body;
        let user;
        if (!username || !password) {
            return res.status(400).send("Username and password");
        } else {
            // get user hash from the db
            user = await getUSerHash(username);
            console.log('user',user.rows)
        }

        if (!user) {
            return res.status(400).send("User or password is incorrect!");
        }


        let token = null
        // match hash and password
        try {
            console.log(user.password);
            console.log(user)
            const isTruePassword = await comparePassword(password, user?.rows[0]?.password);
            console.log('isTruePassword',isTruePassword);
            // const isTruePassword = null;
            // if match, generate a auth token
            if (!isTruePassword) {
                return res.status(400).send("Password is incorrect!");
            }

            token = await generateToken(password);

            console.log(token)
        } catch (error) {
            console.log('ERROR',error);
            return res.status(400).send("Wrong username or password!");
        }

        return res.status(200).json({
            token: token
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