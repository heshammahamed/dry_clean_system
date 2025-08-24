import { Response, Request } from "express"
import { usersD } from "../db/schema/schemaDataTypes.js"
import { checkPassword , makeJwt , makeRefreshToken } from "../auth.js"
import { getUserData } from "../db/query/getUserData.js"
import { createRefreshTokenQ } from "../db/query/refreshToken.js"
import { configer } from "../config.js"

/*
(1)
    check the usernama and the password for the given request are exist
(2)
    get the user password and data using phone number : 
        - the phone number is not exit 
    check password : 
        - password is wrong
*/

export async function handleLogin (req : Request , res : Response) {
    if (!req.body.phonenumber) {
        // internet connection error
        throw new Error("username")
    }

    if (!req.body.password) {
        // internet connection error
        throw new Error("password")
    }

    const user : usersD | undefined = await getUserData(req.body.phonenumber)

    if (!user) {
        // wrong inputs
        throw new Error("username is not found")
    }

    if (!(await checkPassword(req.body.password , user.password))) {
        // wrong inputs
        throw new Error("password is not correct")
    }

    /*
        create access token refresh token and set them as ckokiess
    */

    const access_token : string = makeJwt(user.shopId , user.owner ? "admin" : "worker")

    const refresh_token : string = makeRefreshToken()
    const token_db : string | undefined = await createRefreshTokenQ(user.id , refresh_token)

    if (!token_db) {
        // it will not happen cause if there a problem it will be chached in the try/catch in makeing the query
        // thorw error here to say that the refresh token is not created for i dont know the resonse
        throw new Error("there is error in creating the refresh token")
    }

    res.setHeader("Set-Cookie", [
      `access_token=${access_token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${configer.accesstoekn}`,
      `refresh_token=${refresh_token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${configer.refreshtokenduration}`
    ]);
    
    res.sendFile("/main/")
    return
}