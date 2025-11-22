import { Request , Response , NextFunction } from "express";
import { getListOrdersQ } from "../db/query/getListOrders.js"
import { Unauthorized } from "../errorClassess.js";
/*
    the inputs will must be there and in the correct
     formate so its not need to make conditions for it
*/


/*
    this end point will not take any thing and it will return all orders that not finished

    
*/
export async function handleOrdersList (req : Request , res : Response) {
    if (! (req as any).user) {
        throw new Unauthorized("you need to relogin")
    }
    // you must be sure that the query is sent
    if (typeof req.query.date == "string") {
        const result = await getListOrdersQ((req as any).user.shopId ,req.query.date)
        res.setHeader("Control-Control" , "public , max-age=30");
        return res.status(200).json(result)
    }else {
        throw new Error("shit!!")
    }
}
    

