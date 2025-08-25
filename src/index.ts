import { configer } from "./config.js";
import express, { json , Response, Request } from "express"
import {handleLogin} from "./handlers/login.js"
import {errorMiddlware} from "./middlewars/errors.js"
import cookieParser from "cookie-parser"
import { checkValidationMiddleware } from "./middlewars/authantication.js"

const app = express();
app.use(cookieParser())


app.use(express.static(configer.frontmainpath));
app.use(express.json())
// the cokkies will always check excpect if you make route request

app.use(checkValidationMiddleware)

app.post("/api/login" , handleLogin);



app.use(errorMiddlware)
app.listen(configer.port , () => {
    console.log(`the server is know run on the ${configer.port}`)
})