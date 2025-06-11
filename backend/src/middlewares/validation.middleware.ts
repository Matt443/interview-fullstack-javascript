import { NextFunction, Request, Response } from "express";
import { cityValidation } from "../utils/validation.util";
import { sendError } from "../utils/error.util";
import { getQueryParam } from "../utils/api.util";
import { CitySearchQuery } from "../types/api.type";

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
