import { NextFunction, Request, Response } from "express";
import auth from "../2-utils/auth";
import { UnauthorizedError } from "../4-models/client-errors";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction ): Promise<void> {

    // extract auth header value
    const authHeader = request.header("authorization");

    // verify token
    const isValid = await auth.verifyToken(authHeader);

    // if token not valid
    if (!isValid) {
        next( UnauthorizedError("You are not logged in")); // catch all 
        return;
    }

    // if token is valid continue
    next();  
}

export default verifyLoggedIn;
