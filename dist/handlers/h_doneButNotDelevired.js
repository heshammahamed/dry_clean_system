import { doneButNotDelevierdQ } from "../db/query/doneButNotDelevired.js";
export async function handleDoneNotDelevierd(req, res) {
    const orders = await doneButNotDelevierdQ('f7236b8e-599a-4f90-98a8-f78482785946');
    // const orders  = await doneButNotDelevierdQ((req as any).users.shopId)
    return res.status(200).json(orders);
}
