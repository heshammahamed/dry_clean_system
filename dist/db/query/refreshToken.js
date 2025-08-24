import { pool } from "../db.js";
import { configer } from "../../config.js";
/*
    create refresh token
    userId , token -> token from db after it inserted
*/
export async function createRefreshTokenQ(userId, token) {
    const now = new Date();
    const expireDate = new Date(Date.now() + configer.refreshtokenduration);
    const values = [token, userId, expireDate, now, now];
    try {
        const result = await pool.query(`
            INSERT INTO refreshtokens (token, userId, expiredAt, createdAt, updatedAt)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `, values);
        return result.rows[0]?.token;
    }
    catch (err) {
        throw new Error(`db error`);
    }
}
// get token 
// you must make it return the shopid and role from the user id !!!!!!!!!!!!
export async function checkRefreshTokenQ(token) {
    const now = new Date();
    const result = await pool.query(`SELECT userId 
       FROM refreshtokens 
       WHERE token = $1 
         AND $2 <= expiredAt 
         AND revokedAt IS NULL
       LIMIT 1`, [token, now]);
    return result.rows[0]?.userId;
}
// update refresh token
