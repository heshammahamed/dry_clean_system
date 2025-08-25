import { fileURLToPath } from "url";
import path from "path";
process.loadEnvFile('.env');
//  here there is alot of error handling that will close system
const port = process.env.PORT ? Number(process.env.PORT) : 8080;
const password = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "xx";
const accesstoken = process.env.ACCESS_TOKEN_DURATION ? Number(process.env.ACCESS_TOKEN_DURATION) : 3600;
const secretkey = process.env.SECRET_KEY_TOKEN ? process.env.SECRET_KEY_TOKEN : "xx";
const refreshtokenlength = process.env.REFRESH_TOKEN_LENGTH ? Number(process.env.REFRESH_TOKEN_LENGTH) : 16;
const refreshtokenduration = process.env.REFRESH_TOKEN_DURATION ? Number(process.env.REFRESH_TOKEN_DURATION) : 5184000;
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
