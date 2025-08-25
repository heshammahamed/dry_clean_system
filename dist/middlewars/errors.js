import { BadRequest, NotFound, Unauthorized } from "../errorClassess.js";
import path from "path";
import { configer } from "../config.js";
export function errorMiddlware(error, req, res, nextFun) {
    console.error(error.message);
    if (error instanceof Unauthorized) {
        return res.status(401).type("html").sendFile(path.join(configer.frontmainpath, 'login/index.html'));
    }
    if (error instanceof NotFound) {
        return res.status(404).json({ "message": error.message });
    }
    if (error instanceof BadRequest) {
        return res.status(400).json({ "message": error.message });
    }
    return res.status(500).send();
}
