import { Request } from "express";
import { hash , compare} from "bcrypt";
import JWT , { JwtPayload } from "jsonwebtoken";
import { configer } from "./config.js";
import { randomBytes } from "crypto";
const {sign , verify} = JWT;

type payload = Pick<JwtPayload , "iss" | "sub" | "iat" | "exp">;

export function makeRefreshToken () {
    return randomBytes(configer.refreshtokenlength).toString("hex")
}

export function getBearerToken(req : Request) : string {
    const token : string | undefined = req.headers.authorization?.slice(7);

    if (!token) {
        throw new Error("the roken is not sent")
    }

    return token
}


export function makeJwt (shopId : string ,role : string ) : string {
    const issuedAT : number = Math.floor(Date.now() / 1000);

    const payload : payload = {
        "iss" : role,
        "sub" : shopId,
        "iat" : issuedAT,
        "exp" : issuedAT + configer.accesstoekn
    }

    return sign(payload , configer.secretkey )
}

export function validateJWT (tokenstring : string) : string {
    let payload;
    try {
        payload = verify(tokenstring , configer.secretkey)
        if (typeof payload.sub !== "string") {
            throw new Error("it will not happen but i do it cause of the type script")
        }
        return payload.sub
    }catch (err) {
        throw new Error("the token is in valid")
    }
}

export async function hashPassword (password : string) : Promise<string> {
    return await hash(password , 10)
}

export async function checkPassword(password : string , hash : string) : Promise<boolean> {
    return await compare(password , hash)
}
