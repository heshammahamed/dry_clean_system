import { Response , Request } from "express";
import { passedOrdersQ } from "../db/query/pasedOrders.js";

export async function handlePassedOrders(req : Request , res : Response) {
    const orders = await passedOrdersQ((req as any).users.shopId)
    return res.status(200).json(orders)
}