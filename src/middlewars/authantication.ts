import { Response, Request , NextFunction } from "express"
import { validateJWT , makeJwt } from "../auth.js"
import { checkRefreshTokenQ } from "../db/query/refreshToken.js"
import { Unauthorized } from "../errorClassess.js"
import { configer } from "../config.js"



export async function checkValidationMiddleware (req : Request , res : Response , nextFun :NextFunction) {
    
    if (req.path === "/api/login") {
        return nextFun();
    }

    try {

        if (!req.cookies.access_token) {
            throw new Error
        }

        const data = validateJWT(req.cookies.access_token);
        (req as any).user = data
        return nextFun()

    }catch(err : any) {
        if (req.cookies.refresh_token) {
            const data = await checkRefreshTokenQ(req.cookies.refresh_token)

            if (!data) {
                throw new Unauthorized("the refresh token is already expired")
            }

            const new_access_token = makeJwt(data.shopId , data.admin)

            res.setHeader("Set-Cookie", [
                `access_token=${new_access_token}; HttpOnly; Secure; SameSite=Strict; Path=/api; Max-Age=${configer.accesstoekn}`,
            ]);

            (req as any).user = data
            return nextFun()
        }

        throw new Unauthorized(`the tokens are outedated : ${req.url} `)      
    }
}