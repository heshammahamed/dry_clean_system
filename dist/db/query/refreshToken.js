import { pool } from "../db.js";
import { configer } from "../../config.js";
/*
    create refresh token
    userId , token -> token from db after it inserted
*/
export async function createRefreshTokenQ(userId, token) {
    const expireDate = new Date(Date.now() + configer.refreshtokenduration * 1000);
    const values = [token, userId, expireDate];
    try {
        const result = await pool.query(`
            INSERT INTO refreshtokens (token, userId, expiredAt)
            VALUES ($1, $2, $3)
            RETURNING *
            `, values);
        return result.rows[0]?.token;
    }
    catch (err) {
        throw new Error(`db error : ${err.message}`);
    }
}
// get token 
export async function checkRefreshTokenQ(token) {
    const now = new Date();
    try {
        const result = await pool.query(`SELECT admin, shopId
            FROM users
            WHERE user_id IN (
                SELECT userid
                FROM refreshtokens
                WHERE token = $1
                  AND $2 <= expiredAt
                  AND revokedAt IS NULL
            )`, [token, now]);
        return result.rows[0];
    }
    catch (err) {
        throw new Error(`db Error : ${err.message}`);
    }
}
// update refresh token
