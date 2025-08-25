import { pool } from "../db.js";
import { configer } from "../../config.js";




/*
    create refresh token 
    userId , token -> token from db after it inserted
*/
export async function createRefreshTokenQ(userId: string, token: string) : Promise<string | undefined> {
    const expireDate = new Date(Date.now() + configer.refreshtokenduration * 1000);

    const values = [token, userId, expireDate];

    try {
        const result = await pool.query(
            `
            INSERT INTO refreshtokens (token, userId, expiredAt)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            values
        );
        return result.rows[0]?.token; 
    }catch(err : any) {
        throw new Error(`db error : ${err.message}`)
    }
}


// get token 
// you must make it return the shopid and role from the user id !!!!!!!!!!!!
export async function checkRefreshTokenQ(token : string) : Promise<string | undefined> {
    const now = new Date();
    try {
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
    }catch(err : any) {
        throw new Error(`db Error : ${err.message}`)
    }
}

// update refresh token