import { Response , Request } from "express";
import { doneButNotDelevierdQ } from "../db/query/doneButNotDelevired.js"

export async function handleDoneNotDelevierd (req : Request , res : Response) {
    const orders  = await doneButNotDelevierdQ((req as any).users.shopId)
    return res.status(200).json(orders)
}