

import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"


const verifyToken = (token: string, secret: string) => {
    try {
        const verifyToken = jwt.verify(token, secret) as JwtPayload
        return {
            success: true,
            data: verifyToken
        }
    } catch (error: any) {

        return {
            success: false,
            error: error.message
        }

    }
}

export const jwtUtils = {
   
    verifyToken
}