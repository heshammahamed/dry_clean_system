import { pool } from "../db.js";
import { order } from "../../types/types.js";

/*
    serach to the userid by (name or phone or both and shopId)
    then search on orders that not given to customer yet.
    
    if i have phone number just search by phone nymber. to the customer id.
    use IN(...) cause in sense of many user ids 
*/

// return array of orders or non
export async function getCustomerData (phonenumber : string , username : string , shopId : string) : Promise<Array<order>> {
    
    // i will be sure that either phonenumber or username will be string
    let column : string = phonenumber ? "phonenumber" : "name";
    let value = phonenumber ? phonenumber : username; 


    try {
        const result = await pool.query(`
            SELECT o.*
            FROM orders o
            JOIN customers c ON o.customerId = c.id
            WHERE c.${column} = $1
              AND c.shopId = $2
              AND o.delevired = false
            ORDER BY o.deliver_at ASC
        `, [value, shopId]);
        return result.rows
    }catch (err) {
        throw new Error(`db error in find oredes of the customre : ${err}`)
    }

}