import { configer } from "./config.js";
import express, { json , Response, Request } from "express"
import {handleLogin} from "./handlers/login.js"
import {errorMiddlware} from "./middlewars/errors.js"
import cookieParser from "cookie-parser"
import { checkValidationMiddleware } from "./middlewars/authantication.js"
import { handleOrdersList } from "./handlers/listOrders.js"
import {  handleCustomerOrder } from "./handlers/customersOrders.js"
import { handleDelevired } from "./handlers/handleDelevired.js"
import { handleDone } from "./handlers/handleDone.js"
const app = express();
app.use(cookieParser())

// dont forget to add a five icon to your project cause browser automatically send this request
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(express.static(configer.frontmainpath));
app.use(express.json())
// the cokkies will always check excpect if you make route request

app.post("/api/login" , handleLogin);

app.use(checkValidationMiddleware)

app.get("/api/orders" , handleOrdersList);
app.get("/api/customerOrders" , handleCustomerOrder);

app.get("/api/delevired" , handleDelevired);
app.get("/api/done" , handleDone);

app.use(errorMiddlware)
app.listen(configer.port , () => {
    console.log(`the server is know run on the ${configer.port}`)
})