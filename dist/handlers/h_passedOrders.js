import { passedOrdersQ } from "../db/query/pasedOrders.js";
export async function handlePassedOrders(req, res) {
    const orders = await passedOrdersQ('f7236b8e-599a-4f90-98a8-f78482785946');
    // const orders = await passedOrdersQ((req as any).users.shopId)
    return res.status(200).json(orders);
}
