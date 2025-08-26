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

    // test case

    const result : Array<order> = await getCustomerData(phonenumber , name , 'f7236b8e-599a-4f90-98a8-f78482785946');
    
    // real one
    // const result : Array<order> = await getCustomerData(phonenumber , name , (req as any).users.shopId);
    
    return res.status(200).json(result)
}
