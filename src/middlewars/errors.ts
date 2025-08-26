import {Request , Response , NextFunction} from "express";
import { BadRequest, NotFound, Unauthorized } from "../errorClassess.js";
import path from "path";
import { configer } from "../config.js";

export function errorMiddlware (error : Error , req : Request , res : Response , nextFun : NextFunction) {
    console.error(error.message , req.baseUrl);

    if (error instanceof Unauthorized) {
        return res.status(401).send()
    }

    if (error instanceof NotFound) {
        return res.status(404).json({"message" : error.message})
    }

    if (error instanceof BadRequest) {
        return res.status(400).json({"message" : error.message})
    }

    return res.status(500).send()
}