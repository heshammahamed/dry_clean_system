import { pool } from "../db.js";
import { configer } from "../../config.js";
import {retutnFromValidate } from "../../types/types.js"



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
            WITH deleted AS (
                DELETE FROM refreshtokens WHERE userId = $2
            )
                
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

export async function checkRefreshTokenQ(token : string) : Promise<retutnFromValidate | undefined> {
    const now = new Date();
    try {
        const result = await pool.query(
          `SELECT admin, shopId
            FROM users
            WHERE id IN (
                SELECT userid
                FROM refreshtokens
                WHERE token = $1
                  AND $2 <= expiredAt
                  AND revokedAt IS NULL
            )`,
          [token, now]
        );
        return result.rows[0]
    }catch(err : any) {
        throw new Error(`db Error : ${err.message}`)
    }
}

// update refresh token