import { NextFunction, Request, Response } from "express";
import { getCities } from "../models/city.model";
// import cityModel from "../models/city.model";

export default {
    async getCities(req: Request, res: Response, next: NextFunction) {
        try {
            // cityModel.getCities();
            res.send(await getCities());
        } catch (e) {
            res.status(500);
        }
    },
};
