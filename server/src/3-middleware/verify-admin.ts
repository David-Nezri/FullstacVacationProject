import { NextFunction, Request, Response } from "express";
import auth from "../2-utils/auth";
import { ForbiddenError, UnauthorizedError } from "../4-models/client-errors";

async function verifyAdmin(request: Request, response: Response, next: NextFunction ): Promise<void> {

    // extract auth header value
    const authHeader = request.header("authorization");

    // verify token
    const isValid = await auth.verifyToken(authHeader);

    // if token not valid
    if (!isValid) {
        next( UnauthorizedError("You are not logged in")); // catch all 
        return;
    }

    // extract role 
    const role = auth.getUserRoleIdFromToken(authHeader);

    if (role !== 1) {
        next( ForbiddenError("You do not have appropriate permissions"))
        return
    }

    // if token valid then next
    next(); 
}

export default verifyAdmin;
