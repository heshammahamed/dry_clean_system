import { pool } from "../db.js";
import { order } from "../../types/types.js"
import { cursor } from "../../types/types.js";

export async function getListOrdersQ(shopId : string , cursorObj : cursor | null , limit : number  ) : Promise<Array<order>> {

    try {
        let query_text;
        let query_params : any[];
        if (cursorObj) {
            query_text = `
                SELECT *
                FROM orders
                WHERE delevired = false
                  AND (delivery_at, id) > ($1, $2)
                ORDER BY delivery_at ASC, id ASC
                LIMIT $3
            `;
            query_params = [cursorObj.delivery_at , cursorObj.id , limit]
        }else {
            query_text = `
                SELECT *
                FROM orders
                WHERE delevired = false
                ORDER BY delivery_at ASC, id ASC
                LIMIT $1
            `;
            query_params = [limit]
        }

        const listOrders = await pool.query(query_text,query_params)
        
        return listOrders.rows
    }catch (err : any) {
        throw new Error(`db error : ${err.message} `)
    }
}