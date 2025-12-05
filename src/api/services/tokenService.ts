import jwt from "jsonwebtoken"

export const generateToken = async (token: string) => {
     return await jwt.sign({data: token}, process.env.JWT_SECRET,{expiresIn: "1h"});
}

export const generateRefreshToken = async (token: string) => {
    return await jwt.sign({data: token}, process.env.JWT_REFRESH_SECRET,{expiresIn: "1h"});
}

export const verifyToken = async (token: string) => {
    return await jwt.verify(token, process.env.JWT_SECRET)
}

export const verifyRefreshToken = async (token: string) => {
    return await jwt.verify(token, process.env.JWT_REFRESH_SECRET)
}