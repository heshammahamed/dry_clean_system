import { configer } from "./config.js";
import express, { json , Response, Request } from "express"
import path from "path";
import { fileURLToPath } from "url";
import {handleLogin} from "./handlers/login.js"
import {errorMiddlware} from "./middlewars/errors.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "../app")));
app.use(express.json())


app.post("/api/login" , handleLogin);

app.use(errorMiddlware)
app.listen(configer.port , () => {
    console.log(`the server is know run on the ${configer.port}`)
})