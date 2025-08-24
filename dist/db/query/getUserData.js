import { pool } from "../db.js";
export async function getUserData(phonenumber) {
    try {
        const user = await pool.query(`SELECT * FROM users WHERE phonenumber = $1` , [phonenumber]);
        return user.rows;
    }
    catch (err) {
        console.error(err.message)
        return "hh";
    }
}
