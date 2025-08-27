import { doneQ } from "../db/query/done.js";
import { BadRequest } from "../errorClassess.js";
export async function handleDone(req, res) {
    if (typeof req.query.orderId === "string" && req.query.orderId) {
        const updatedRows = await doneQ(req.query.orderId, req.user.shopId);
        if (updatedRows !== 1) {
            throw new BadRequest("you must give me a id for one order");
        }
        return res.status(200).send();
    }
    else {
        throw new Error("will not hsppen it just for typescript");
    }
}
