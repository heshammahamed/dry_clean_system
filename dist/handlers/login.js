import { checkPassword, makeJwt, makeRefreshToken } from "../auth.js";
import { getUserData } from "../db/query/getUserData.js";
import { createRefreshTokenQ } from "../db/query/refreshToken.js";
import { configer } from "../config.js";
import { BadRequest, NotFound } from "../errorClassess.js";
/*
(1)
    check the usernama and the password for the given request are exist
(2)
    get the user password and data using phone number :
        - the phone number is not exit
    check password :
        - password is wrong
*/
export async function handleLogin(req, res) {
    if (!req.body.phonenumber) {
        throw new BadRequest("في مشكله في الشبكه عندك");
    }
    if (!req.body.password) {
        // internet connection error
        throw new BadRequest("في مشكله في الشبكه عندك");
    }
    const user = await getUserData(req.body.phonenumber);
    if (!user) {
        // wrong inputs
        throw new NotFound("رقم التليفون غلط");
    }
    if (!(await checkPassword(req.body.password, user.password))) {
        // wrong inputs
        throw new NotFound("كلمه السر غلط");
    }
    /*
        create access token refresh token and set them as ckokiess
    */
    const access_token = makeJwt(user.shopid, user.owner);
    const refresh_token = makeRefreshToken();
    const token_db = await createRefreshTokenQ(user.id, refresh_token);
    res.setHeader("Set-Cookie", [
        `access_token=${access_token}; HttpOnly; Secure; SameSite=Strict; Path=/api; Max-Age=${configer.accesstoekn}`,
        `refresh_token=${token_db}; HttpOnly; Secure; SameSite=Strict; Path=/api; Max-Age=${configer.refreshtokenduration}`,
    ]);
    // res.type("html").sendFile(path.join(configer.frontmainpath , 'main/index.html'))
    res.status(200).send();
    return;
}
