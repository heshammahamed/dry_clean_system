import { services } from "../types/types.js";
import { getServicesQ } from "../db/query/getServises.js";
import { Request , Response } from "express";

export async function handlerGetServices (req : Request , res : Response) {
    const result : Array<services> = await getServicesQ((req as any).users.shopId);

    return res.status(200).json(result)
}