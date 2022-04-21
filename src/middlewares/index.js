/**
 *
 * This handles requests, responses and errors generically from the Express Routing middleware.
 * @module MIDDLEWARE:HTTP
 */

/**
 *
 * This middle pre-formats, sets all request headers and intercept bad requests.
 * @param {object} request Express request object
 * @param {object} response Express response object
 * @param {object} next Express next function
 */
function setupRequest(request, response, next) {
    request.headers['access-control-allow-origin'] = '*';
    request.headers['access-control-allow-headers'] = '*';

    if (request.method === 'OPTIONS') {
        request.headers['access-control-allow-methods'] = 'GET, POST, PUT, PATCH, DELETE';
        response.status(200).json();
    }

    next();
}

/**
 *
 * This middleware processes and returns all the Successful responses to the Client.
 * @param {object} request Express request object
 * @param {object} response Express response object
 * @param {object} next Express next function
 * @returns {object} Express response object, formatted using the payload on the request param.
 */
function processResponse(request, response, next) {
    if (!request.payload) return next();
    const { status } = request.payload;
    return response.status(status).json(request.payload);
}

/**
 *
 * This middleware processes, and returns all failed responses to the Client.
 * @param {Error} error Error being returned to the front-end from the Error constructor.
 * @param {object} request Express request object. Unused in this function.
 * @param {object} response Express response object
 * @param {object} next Express next function. Unused in this function.
 * @returns {object} Express response object, formatted using the error param.
 */
function handleError(error, request, response, next) {
    if (error.error.error == 'No record found') {
        error.status = 404;
    } else {
        error.status = 500;
    }

    return response.status(error.status).json({
        status: error.status,
        error: error.error || 'Internal Server Error',
        payload: null,
    });
}

module.exports = {
    handleError,
    processResponse,
    setupRequest,
};
