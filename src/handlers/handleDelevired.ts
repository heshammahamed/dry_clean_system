import { Request , Response } from "express";
import { deleviredQ } from "../db/query/delevired.js"
import { BadRequest } from "../errorClassess.js";

export async function handleDelevired(req : Request , res : Response) {
    if (typeof req.query.orderId === "string" && req.query.orderId) {
        const updatedRows : number | null = await deleviredQ(req.query.orderId , (req as any).user.shopId) 
        
        if (updatedRows !== 1) {
            throw new BadRequest("you must give me a id for one order")
        }

        return res.status(200).send()
    }else {
        throw new Error("will not hsppen it just for typescript")
    }

}