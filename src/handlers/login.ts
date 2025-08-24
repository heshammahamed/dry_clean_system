import { Response, Request } from "express"
import { usersD } from "src/db/schema/schemaDataTypes.js"
import { checkPassword } from "../auth.js"
import { getUserData } from "src/db/query/getUserData.js"

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

    const user : usersD = await getUserData(req.body.phonenumber)

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
}