import { Request , Response , NextFunction } from "express";
import { getListOrdersQ } from "../db/query/getListOrders.js"
import { Unauthorized } from "../errorClassess.js";
import { cursor, order } from "../types/types.js";

export async function handleOrdersList (req : Request , res : Response) {
    const limit = 20;
    let result : order[] = [] ;
    let next_cursor_token :  null | string = null;

    if (! (req as any).user) {
        throw new Unauthorized("you need to relogin")
    }

    if (!req.query.cursor) {
        result = await getListOrdersQ((req as any).user.shopId ,null , limit)
    }

    if (typeof req.query.cursor === "string") {
        const decoded = Buffer.from(req.query.cursor, 'base64').toString('utf-8');
        const cursorObj : cursor = JSON.parse(decoded);

        result = await getListOrdersQ((req as any).user.shopId ,cursorObj , limit)
    }

    if (result.length == limit) {
        const last_index = result[result.length - 1]
        const next_cursor : cursor = {
            delivery_at : last_index.deliver_at,
            id : last_index.id
        }
        next_cursor_token = Buffer.from(JSON.stringify(next_cursor)).toString('base64')
    }

    res.status(200).json({
        data : result,
        next : next_cursor_token
    })
}
    

