import { pool } from "../db.js";
/*
    return all orders of the day fiinish or not
*/
export async function getListOrdersQ(shopId, date) {
    try {
        const listOrders = await pool.query(`SELECT * FROM orders WHERE shopId = $1 AND day_receive = $2`, [shopId, new Date(date)]);
        return listOrders.rows;
    }
    catch (err) {
        throw new Error(`db error : ${err.message} `);
    }
}
