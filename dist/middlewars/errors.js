import { BadRequest, NotFound, Unauthorized } from "../errorClassess.js";
export function errorMiddlware(error, req, res, nextFun) {
    console.error(error.message);
    if (error instanceof Unauthorized) {
        return res.status(401).sendFile('/login/');
    }
    if (error instanceof NotFound) {
        return res.status(404).json({ "message": error.message });
    }
    if (error instanceof BadRequest) {
        return res.status(400).json({ "message": error.message });
    }
    return res.status(500).send();
}
