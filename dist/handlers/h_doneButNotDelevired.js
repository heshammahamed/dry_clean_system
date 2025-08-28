import { doneButNotDelevierdQ } from "../db/query/doneButNotDelevired.js";
export async function handleDoneNotDelevierd(req, res) {
    const orders = await doneButNotDelevierdQ(req.users.shopId);
    return res.status(200).json(orders);
}
