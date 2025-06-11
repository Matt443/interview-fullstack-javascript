import { NextFunction, Request, Response, Router } from "express";
import cityController from "../controllers/city.controller";

export default () => {
    const api = Router();
    api.get("/cities", cityController.getCities);
    return api;
};
