import { NextFunction, Request, Response, Router } from "express";
import cityController from "../controllers/city.controller";
import {
    validateCity,
    validateCityToInsert,
    validateCityToUpdate,
} from "../middlewares/validation.middleware";

export default () => {
    const api = Router();
    api.get("/cities", validateCity, cityController.getCities);
    api.post("/cities", validateCityToInsert, cityController.insertCities);
    api.put("/cities", validateCityToUpdate, cityController.updateCity);
    return api;
};
