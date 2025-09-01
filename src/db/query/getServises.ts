import { pool } from "../db.js";
import { services } from "src/types/types.js"; 

export async function getServicesQ (shopId : string) : Promise<Array<services>> {
    try {
        const result = await pool.query(`SELECT id , name , price , catego FROM services WHERE shopId=$1` , [shopId])
        return result.rows
    }catch (err : any) {
        throw new Error(`DB ERROR IN get services ${err.message}`)
    }
}