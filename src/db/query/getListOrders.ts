import { pool } from "../db.js";
import { order } from "../../types/types.js"

/*

retutn all data 
    cursor pagination : 

    we will need to add created_at to the table so we could use it to order recordes and 
    not repeat return same item when we paginate
    
    if from == null return first 20 record 

    else return 20 recored after from
*/

export async function getListOrdersQ(shopId : string , from : string | null ) : Promise<Array<order>> {

    try {
        const listOrders = await pool.query(`SELECT * FROM orders WHERE shopId = $1 AND day_receive = $2`,[shopId , new Date(date)])
        
        return listOrders.rows
    }catch (err : any) {
        throw new Error(`db error : ${err.message} `)
    }
}