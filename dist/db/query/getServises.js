import { pool } from "../db.js";
export async function getServicesQ(shopId) {
    try {
        const result = await pool.query(`SELECT * FROM services WHERE shopId=$1`, [shopId]);
        return result.rows;
    }
    catch (err) {
        throw new Error(`DB ERROR IN get services ${err.message}`);
    }
}
