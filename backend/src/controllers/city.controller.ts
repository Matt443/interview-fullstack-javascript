import { NextFunction, Request, Response } from "express";
import cityModel from "../models/city.model";
import { sendError } from "../utils/error.util";

export default {
    async getCities(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await cityModel.getCities());
        } catch (error) {
            sendError(res, 500, "Server Error");
        }
    },
};
