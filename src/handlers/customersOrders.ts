import { Request , Response } from "express";
import { getCustomerData } from "../db/query/getCustomerOrder.js"
import { order } from "../types/types.js"
import { BadRequest } from "../errorClassess.js"

export async function handleCustomerOrder(req : Request , res : Response) {
    const phonenumber =  typeof req.query.phonenumber == "string" ? req.query.phonenumber : ""
    const name = typeof req.query.name == "string" ? req.query.name : ""

    if (!phonenumber&& !name) {
        throw new BadRequest("لازم تكتب اسم العميل او رقم تليفونه")
    }

    const result : Array<order> = await getCustomerData(phonenumber , name , (req as any).users.shopId);
    
    return res.status(200).json(result)
}
