import { NextFunction, Request, Response } from "express";
import cityModel from "../models/city.model";
import { sendError } from "../utils/error.util";
import { CitySearchQuery } from "../types/api.type";

export default {
    async getCities(
        req: { queryValidation?: boolean[]; query: object },
        res: Response,
        next: NextFunction,
    ) {
        if (!req.queryValidation) return sendError(res, 500, "Server Error");

        const { name, uuid, min, max } = req.query as unknown as CitySearchQuery;
        try {
            res.send(await cityModel.getCities(req.queryValidation, { name, uuid, min, max }));
        } catch (error) {
            sendError(res, 500, "Server Error");
        }
    },
    async insertCities(req: Request, res: Response, next: NextFunction) {},
};
