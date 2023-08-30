
//  client error object
export function ClientError(status, message) {
    return {
        status,
        message
    };
}


export function IdNotFoundError(id) {
    return ClientError(404, `id ${id} not found`);
}

export function RouteNotFoundError(route) {
    return ClientError(404, `route ${route} not found`);
}

export function ValidationError(message) {
    return ClientError(400, message);
}

export function UnauthorizedError(message) {
    return ClientError(401, message);
}

export function ForbiddenError(message) {
    return ClientError(403, message);
}



