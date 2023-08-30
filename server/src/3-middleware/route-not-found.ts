import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../4-models/client-errors"

function routeNotFound(request: Request, response: Response, next: NextFunction): void {
    const err =  RouteNotFoundError(request.originalUrl);
    next(err); // go to catch all 
}

export default routeNotFound;
