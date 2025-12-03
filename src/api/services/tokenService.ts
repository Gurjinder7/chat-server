import jwt from "jsonwebtoken"

export const generateToken = async (token: string) => {
     return await jwt.sign(token, process.env.JWT_SECRET)
}

