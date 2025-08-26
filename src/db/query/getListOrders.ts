import { pool } from "../db.js";
import { order } from "../../types/types.js"

export async function getUserData(shopId : string , date : string ) : Promise<Array<order>> {

    try {
        const listOrders = await pool.query(`SELECT * FROM orders WHERE shopId = $1 AND day_receive = $2`,[shopId , new Date(date)])
        
        return listOrders.rows
    }catch (err : any) {
        throw new Error(`db error : ${err.message} `)
    }
}