import { deleviredQ } from "../db/query/delevired.js";
import { BadRequest } from "../errorClassess.js";
export async function handleDelevired(req, res) {
    if (typeof req.query.orderId === "string" && req.query.orderId) {
        // const updatedRows : number | null = await deleviredQ(req.query.orderId , (req as any).user.shopId) 
        const updatedRows = await deleviredQ(req.query.orderId, 'f7236b8e-599a-4f90-98a8-f78482785946');
        if (updatedRows !== 1) {
            throw new BadRequest("you must give me a id for one order");
        }
        return res.status(200).send();
    }
    else {
        throw new Error("will not hsppen it just for typescript");
    }
}
