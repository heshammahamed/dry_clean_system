import { getCustomerData } from "../db/query/getCustomerOrder.js";
import { BadRequest } from "../errorClassess.js";
export async function handleCustomerOrder(req, res) {
    const phonenumber = typeof req.query.phonenumber == "string" ? req.query.phonenumber : "";
    const name = typeof req.query.name == "string" ? req.query.name : "";
    if (!phonenumber && !name) {
        throw new BadRequest("لازم تكتب اسم العميل او رقم تليفونه");
    }
    const result = await getCustomerData(phonenumber, name, req.users.shopId);
    return res.status(200).json(result);
}
