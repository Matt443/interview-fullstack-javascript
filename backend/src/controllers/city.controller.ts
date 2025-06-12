import { NextFunction, Request, Response } from "express";
import cityModel from "../models/city.model";
import { sendError } from "../utils/error.util";
import { CitySearchQuery } from "../types/api.type";
import { City } from "../types/city.type";

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
            console.error(error);
            sendError(res, 500, "Server Error");
        }
    },
    async insertCities(req: Request, res: Response, next: NextFunction) {
        try {
            const citiesAdded: number = await cityModel.insertCities(req.body.cities);
            if (!citiesAdded || citiesAdded < 1) {
                return sendError(res, 422, "Unprocessable Entity");
            }
            res.send({ mgs: `Sucessfully added ${citiesAdded} rows` });
        } catch (error) {
            console.error(error);
            sendError(res, 500, "Server Error");
        }
    },
    async updateCity(req: Request, res: Response, next: NextFunction) {
        try {
            const { cityName, uuid, count } = req.body.city as unknown as City;
            const id = req.body.id as unknown as string;
            const citiesUpdated: number = await cityModel.updateCity(id, { cityName, uuid, count });
            if (!citiesUpdated || citiesUpdated !== 1) {
                return sendError(res, 422, "Unprocessable Entity");
            }
            res.send({ mgs: `Sucessfully updated ${citiesUpdated} rows` });
        } catch (error) {
            console.error(error);
            sendError(res, 500, "Server Error");
        }
    },
    async deleteCity(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.query.id as unknown as string;
            const rowsDeleted = await cityModel.deleteCity(id);
            res.send({ mgs: `Sucessfully deleted ${rowsDeleted} rows` });
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
