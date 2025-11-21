import { getServicesQ } from "../db/query/getServises.js";
export async function handlerGetServices(req, res) {
    const result = await getServicesQ(req.users.shopId);
    return res.status(200).json(result);
}
