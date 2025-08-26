import { configer } from "./config.js";
import express from "express";
import { handleLogin } from "./handlers/login.js";
import { errorMiddlware } from "./middlewars/errors.js";
import cookieParser from "cookie-parser";
import { handleOrdersList } from "./handlers/listOrders.js";
import { handleCustomerOrder } from "./handlers/customersOrders.js";
const app = express();
app.use(cookieParser());
// dont forget to add a five icon to your project cause browser automatically send this request
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use(express.static(configer.frontmainpath));
app.use(express.json());
// the cokkies will always check excpect if you make route request
app.post("/api/login", handleLogin);
app.get("/api/customerOrders", handleCustomerOrder);
// app.use(checkValidationMiddleware)
app.get("/api/orders", handleOrdersList);
app.use(errorMiddlware);
app.listen(configer.port, () => {
    console.log(`the server is know run on the ${configer.port}`);
});
