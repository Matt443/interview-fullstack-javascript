import { NextFunction, Request, Response, Router } from "express";
import cityController from "../controllers/city.controller";
import {
    pagePropsValidation,
    validateCity,
    validateCityToInsert,
    validateCityToUpdate,
    validateUUID,
} from "../middlewares/validation.middleware";

export default () => {
    const api = Router();
    api.get("/cities", validateCity, pagePropsValidation, cityController.getCities);
    api.get("/cities/autocomplete", cityController.getAutocomplete);
    api.post("/cities", validateCityToInsert, cityController.insertCities);
    api.put("/cities/:id", validateUUID, validateCityToUpdate, cityController.updateCity);
    api.delete("/cities/:id", validateUUID, cityController.deleteCity);
    return api;
};
