import { hash, compare } from "bcrypt";
import JWT from "jsonwebtoken";
import { configer } from "./config.js";
import { randomBytes } from "crypto";
const { sign, verify } = JWT;
export function makeRefreshToken() {
    return randomBytes(configer.refreshtokenlength).toString("hex");
}
export function getBearerToken(req) {
    const token = req.headers.authorization?.slice(7);
    if (!token) {
        throw new Error("the roken is not sent");
    }
    return token;
}
export function makeJwt(shopId, role) {
    const issuedAT = Math.floor(Date.now() / 1000);
    const payload = {
        "iss": role ? "admin" : "worker",
        "sub": shopId,
        "iat": issuedAT,
        "exp": issuedAT + configer.accesstoekn
    };
    return sign(payload, configer.secretkey);
}
export function validateJWT(tokenstring) {
    let payload;
    payload = verify(tokenstring, configer.secretkey);
    if (typeof payload === "string") {
        throw new Error("it will not happen but i do it cause of the type script");
    }
    if (payload.sub == undefined) {
        throw new Error("what the duck !! where is the shop id from JWT");
    }
    return { admin: payload.iss === "admin", shopId: payload.sub };
}
export async function hashPassword(password) {
    return await hash(password, 10);
}
export async function checkPassword(password, hash) {
    return await compare(password, hash);
}
