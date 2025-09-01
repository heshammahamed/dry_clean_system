import { passedOrdersQ } from "../db/query/pasedOrders.js";
export async function handlePassedOrders(req, res) {
    const orders = await passedOrdersQ(req.users.shopId);
    return res.status(200).json(orders);
}
