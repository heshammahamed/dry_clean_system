import { configer } from "./config.js";
import express, { json , Response, Request } from "express"
import path from "path";
import {handleLogin} from "./handlers/login.js"
import {errorMiddlware} from "./middlewars/errors.js"

const app = express();

app.use(express.static(configer.frontmainpath));
app.use(express.json())


app.post("/api/login" , handleLogin);

app.use(errorMiddlware)
app.listen(configer.port , () => {
    console.log(`the server is know run on the ${configer.port}`)
})