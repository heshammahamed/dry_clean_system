import { pool } from "../db.js";
export async function doneQ(id, shopId) {
    try {
        const result = await pool.query(`UPDATE orders SET status_=true WHERE id=$1 AND shopID=$2`, [id, shopId]);
        return result.rowCount;
    }
    catch (err) {
        throw new Error(`Db err in convert delevired : ${err.message}`);
    }
}
