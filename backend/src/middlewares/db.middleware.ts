import { NextFunction, Request, Response } from "express";
import { sendError } from "../utils/error.util";
import cityModel from "../models/city.model";

export async function createTableIfNotExists(req: Request, res: Response, next: NextFunction) {
    try {
        await cityModel.createTableIfNotExists();
        next();
    } catch (error) {
        console.error(error);
        sendError(res, 500, "Server Error");
    }
}
