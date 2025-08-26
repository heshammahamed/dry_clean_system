import { getUserData } from "../db/query/getListOrders.js";
/*
    the inputs will must be there and in the correct
     formate so its not need to make conditions for it
*/
export async function handleOrdersList(req, res) {
    // you must be sure that the query is sent
    if (typeof req.query.date == "string") {
        const result = await getUserData(req.user.shopId, req.query.date);
        res.setHeader("Control-Control", "public , max-age=30");
        return res.status(200).json(result);
    }
    else {
        throw new Error("shut");
    }
}
