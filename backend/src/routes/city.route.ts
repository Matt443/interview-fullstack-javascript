import { NextFunction, Request, Response, Router } from "express";
import cityController from "../controllers/city.controller";
import { validateCity } from "../middlewares/validation.middleware";

export default () => {
    const api = Router();
    api.get("/cities", validateCity, cityController.getCities);
    api.post("/cities", validateCity, cityController.insertCities);
    return api;
};
