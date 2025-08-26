import { fileURLToPath } from "url";
import path from "path";
process.loadEnvFile('.env');
//  here there is alot of error handling that will close system
if (!process.env.PORT || !process.env.DB_PASSWORD || !process.env.ACCESS_TOKEN_DURATION || !process.env.SECRET_KEY_TOKEN || !process.env.REFRESH_TOKEN_LENGTH || !process.env.REFRESH_TOKEN_DURATION) {
    console.error("Missing environment variables. Exiting...");
    process.exit(1);
}
const port = Number(process.env.PORT);
const password = process.env.DB_PASSWORD;
const accesstoken = Number(process.env.ACCESS_TOKEN_DURATION);
const secretkey = process.env.SECRET_KEY_TOKEN;
const refreshtokenlength = Number(process.env.REFRESH_TOKEN_LENGTH);
const refreshtokenduration = Number(process.env.REFRESH_TOKEN_DURATION);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), '../app');
export const configer = {
    port: port,
    dbpassword: password,
    accesstoekn: accesstoken,
    secretkey: secretkey,
    refreshtokenlength: refreshtokenlength,
    refreshtokenduration: refreshtokenduration,
    frontmainpath: __dirname
};
