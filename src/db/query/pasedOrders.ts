import { order } from "../../types/types.js";
import { pool } from "../db.js";

export async function passedOrdersQ(shopId : string) : Promise<Array<order>> {

    try {
        const result = await pool.query(`
            SELECT *
            FROM orders
            WHERE shopId = $1
            AND deliver_at < CURRENT_TIMESTAMP
            AND done = false
        ` , [shopId])
        return result.rows
    }catch (err : any) {
        throw new Error(`
            DB error in the passed orders query : ${err.message}`)
    }
}