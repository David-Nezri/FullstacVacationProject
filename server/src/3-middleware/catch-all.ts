import { NextFunction, Request, Response } from "express";
import { logger } from "../2-utils/logger";
import config from "../2-utils/config";

function catchAll(
    err: any,
    request: Request,
    response: Response,
    next: NextFunction
): void {
    if (config.devMode) {

        // Log the error to an error log file
         logger(err.message)
         
        // Log error to console
        console.log(err);

        // Get status code
        const statusCode = err.status ? err.status : 500;

        // Return error to client
        response.status(statusCode).send(err.message);
    } else {
        // Get status 
        const statusCode = err.status ? err.status : 500;

        // Return error to client
        response
            .status(statusCode)
            .send("try again");
    }
}

export default catchAll;
