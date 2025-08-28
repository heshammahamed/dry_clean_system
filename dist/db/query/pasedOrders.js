import { pool } from "../db.js";
export async function passedOrdersQ(shopId) {
    try {
        const now = new Date();
        const date = now.toISOString().split("T")[0];
        const time = now.toTimeString().split(" ")[0];
        const result = await pool.query(`
            SELECT *
            FROM orders
            WHERE shopId = $1
              AND (
                    day_receive < CURRENT_DATE
                    OR (day_receive = CURRENT_DATE AND hour_receive < CURRENT_TIME)
                )
              AND done = false
        `, [shopId]);
        return result.rows;
    }
    catch (err) {
        throw new Error(`
            DB error in the passed orders query : ${err.message}`);
    }
}
