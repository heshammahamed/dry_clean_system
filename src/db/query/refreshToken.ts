import { pool } from "../db.js";
import { configer } from "src/config.js";



/*
    create refresh token 
    userId , token -> token from db after it inserted
*/
export async function createRefreshTokenQ(userId: string, token: string) : Promise<string | undefined> {
    const now = new Date();
    const expireDate = new Date(Date.now() + configer.refreshtokenduration);

    const values = [token, userId, expireDate, now, now];

    const result = await pool.query(
        `
        INSERT INTO refreshtokens (token, userId, expiredAt, createdAt, updatedAt)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        values
    );

    return result.rows[0]?.token; 
}


// get token 
export async function checkRefreshTokenQ(token : string) : Promise<string | undefined> {
    const now = new Date();

    const result = await pool.query(
      `SELECT userId 
       FROM refreshtokens 
       WHERE token = $1 
         AND $2 <= expiredAt 
         AND revokedAt IS NULL
       LIMIT 1`,
      [token, now]
    );

    return result.rows[0]?.userId
}

// update refresh token