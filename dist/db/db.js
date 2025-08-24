import { Pool } from "pg";
import { configer } from "../config.js";
export const pool = new Pool({
    user: "postgres",
    password: configer.dbpassword,
    host: "localhost",
    port: 5432,
    database: "dry_clean",
    ssl: false // same as ?sslmode=disable
});
