import { NextFunction, Request, Response, Router } from "express";
import cityController from "../controllers/city.controller";
import {
    pagePropsValidation,
    validateCity,
    validateCityToInsert,
    validateCityToUpdate,
    validateUUID,
} from "../middlewares/validation.middleware";
import { createTableIfNotExists } from "../middlewares/db.middleware";

export default () => {
    const api = Router();
    api.get(
        "/cities",
        createTableIfNotExists,
        validateCity,
        pagePropsValidation,
        cityController.getCities,
    );
    api.get("/cities/autocomplete", createTableIfNotExists, cityController.getAutocomplete);
    api.post("/cities", validateCityToInsert, createTableIfNotExists, cityController.insertCities);
    api.put(
        "/cities/:id",
        validateUUID,
        validateCityToUpdate,
        createTableIfNotExists,
        cityController.updateCity,
    );
    api.delete("/cities/:id", validateUUID, createTableIfNotExists, cityController.deleteCity);
    return api;
};
