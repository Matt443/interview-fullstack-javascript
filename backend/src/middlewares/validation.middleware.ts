import { NextFunction, Request, Response } from "express";
import { cityToInsertValidation, cityValidation, validationUUID } from "../utils/validation.util";
import { sendError } from "../utils/error.util";
import { getQueryParam } from "../utils/api.util";
import { CitySearchQuery } from "../types/api.type";
import { City } from "../types/city.type";

export async function validateCity(
    req: { queryValidation?: boolean[]; query: object },
    res: Response,
    next: NextFunction,
) {
    const name = getQueryParam(req.query as unknown as CitySearchQuery, "name", "") as string;
    const min = getQueryParam(req.query as unknown as CitySearchQuery, "min", "") as string;
    const max = getQueryParam(req.query as unknown as CitySearchQuery, "max", "") as string;
    const uuid = getQueryParam(req.query as unknown as CitySearchQuery, "uuid", "") as string;

    const validationResult = cityValidation(name, min, max, uuid);
    if (!validationResult.result) return sendError(res, 400, "Bad Request");
    req.queryValidation = validationResult.queryValidation;

    next();
}

export async function validateCityToInsert(req: Request, res: Response, next: NextFunction) {
    if (Array.isArray(req.body.cities) && req.body.cities.length < 1)
        return sendError(res, 400, "Bad Request");

    const everyOk: boolean = req.body.cities.every((element: City) =>
        cityToInsertValidation(element.cityName, String(element.count), element.uuid),
    );

    if (!everyOk) return sendError(res, 400, "Bad Request");
    next();
}

export async function validateCityToUpdate(req: Request, res: Response, next: NextFunction) {
    const { cityName, uuid, count } = req.body.city as unknown as City;
    const id = (req.body.id = req.body.id as unknown as string);

    if (!cityToInsertValidation(cityName, String(count), uuid) || !validationUUID(id))
        return sendError(res, 400, "Bad Request");
    next();
}
