import { NextFunction, Request, Response } from "express";
import striptags from "striptags"

function sanitize(request: Request, response: Response, next: NextFunction ) {

    // Running body properties
    for(const prop in request.body) {
        //  If the value is string
        if(typeof request.body[prop] === "string") {
            // remove striptags 
            request.body[prop] = striptags(request.body[prop])
        }
    }
    next()
}

export default sanitize