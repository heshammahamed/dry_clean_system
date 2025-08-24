import { QueryResult } from "pg";
import { pool } from "../db.js";
import { usersD } from "../schema/schemaDataTypes.js";


/*
    if the array is empty then the user is not exist so there problem in phnoe number
*/

export async function getUserData(phonenumber : string) : Promise<usersD | undefined> {
    try {
        const user = await pool.query(`SELECT * FROM users WHERE phonenumber = $1` , [phonenumber]);
        return user?.rows[0];
    }
    catch (err) {
        throw new Error("db error")
    }
}
