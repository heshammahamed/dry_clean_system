import { pool } from "../db.js";
import { orderAndcustomerData } from "../../types/types.js"

export async function doneButNotDelevierdQ(shopId : string) : Promise<Array<orderAndcustomerData>> {
    try {
        const result = await pool.query(`
            SELECT o.* , c.name , c.phonenumber FROM orders o
            JOIN customers c ON c.id = o.customerId
            WHERE o.shopId = $1 AND o.done = true AND o.delevired = false 
            ORDER BY o.day_receive
        ` , [shopId])

        return result.rows
    }catch (err : any) {
        throw new Error(`DB error ni finding done and not deleivered orders : ${err.message}`)
    }
}