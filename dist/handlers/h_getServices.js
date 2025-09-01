import { getServicesQ } from "../db/query/getServises.js";
export async function handlerGetServices(req, res) {
    const result = await getServicesQ('f7236b8e-599a-4f90-98a8-f78482785946');
    // const result : Array<services> = await getServicesQ((req as any).users.shopId);
    return res.status(200).json(result);
}
