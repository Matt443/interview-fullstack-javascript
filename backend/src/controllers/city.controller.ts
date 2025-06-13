import { NextFunction, Request, Response } from "express";
import cityModel from "../models/city.model";
import { sendError } from "../utils/error.util";
import { CitySearchQuery } from "../types/api.type";
import { City } from "../types/city.type";
import { getQueryParam } from "../utils/api.util";

export default {
    async getCities(
        req: { queryValidation?: boolean[]; query: object },
        res: Response,
        next: NextFunction,
    ) {
        if (!req.queryValidation) return sendError(res, 500, "Server Error");

        const { name, uuid, min, max } = req.query as unknown as CitySearchQuery;
        const perPage = getQueryParam(
            req.query as unknown as CitySearchQuery,
            "perPage",
            "10",
        ) as string;
        const page = getQueryParam(req.query as unknown as CitySearchQuery, "page", "1") as string;
        try {
            res.send(
                await cityModel.getCities(req.queryValidation, {
                    name,
                    uuid,
                    min,
                    max,
                    perPage,
                    page,
                }),
            );
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
            res.send({ msg: `Sucessfully added ${citiesAdded} rows` });
        } catch (error) {
            console.error(error);
            sendError(res, 500, "Server Error");
        }
    },
    async updateCity(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, uuid, count } = req.body.city as unknown as City;
            const id = req.params.id as unknown as string;
            const citiesUpdated: number = await cityModel.updateCity(id, { name, uuid: id, count });
            if (!citiesUpdated || citiesUpdated !== 1) {
                return sendError(res, 422, "Unprocessable Entity");
            }
            res.send({ msg: `Sucessfully updated ${citiesUpdated} rows` });
        } catch (error) {
            console.error(error);
            sendError(res, 500, "Server Error");
        }
    },
    async deleteCity(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as unknown as string;
            const rowsDeleted = await cityModel.deleteCity(id);
            res.send({ msg: `Sucessfully deleted ${rowsDeleted} rows` });
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async getAutocomplete(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.query.name as unknown as string;
            const dbResponse = await cityModel.getCityAutocomplete(name);
            res.send(dbResponse);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
