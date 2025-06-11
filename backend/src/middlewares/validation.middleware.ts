import { NextFunction, Request, Response } from "express";
import { cityValidation } from "../utils/validation.util";
import { sendError } from "../utils/error.util";
import { getQueryParam } from "../utils/api.util";
import { City } from "../types/city.type";

export async function validateCity(req: Request, res: Response, next: NextFunction) {
    const name = getQueryParam(req.query as unknown as City, "city_name", "") as string;
    const count = getQueryParam(req.query as unknown as City, "count", "") as string;
    const uuid = getQueryParam(req.query as unknown as City, "uuid", "") as string;

    const validationResult = cityValidation(name, count, uuid);
    if (!validationResult.result) return sendError(res, 400, "Bad Request");

    next();
}
