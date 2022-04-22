/**
 *
 * This handles the business logic for the Json Model
 * @module SERVICE:Json
 */

const fs = require('fs');
const path = require('path');

/**
 *
 * This is the integration of the Json model routes
 *  with the Json model controller bridging by holding core business logic.
 * @class
 */
class JsonService {
    constructor(JsonController) {
        this.jsonController = JsonController;
        this.serviceName = 'JsonService';
    }

    /**
     *
     * @typedef RequestFunctionParameter
     * @property {object} request Express Request parameter
     * @property {function} next Express NextFunction parameter
     */

    /**
     * This method is an implementation to handle the business logic
     *  of Reading existing records from the database.
     * This should be used alongside a GET Request alone.
     * @async
     * @method
     * @param {RequestFunctionParameter} {@link RequestFunctionParameter}
     * @returns {object<processSingleRead|processedError>}
     */
    async readRecords({ request, next }) {
        try {
            const { key } = request.query;

            const rawData = fs.readFileSync(path.resolve(__dirname, '../data/data.json'));
            const availableData = JSON.parse(rawData);
            const result = availableData[key][Math.floor(Math.random() * 50) + 1];

            if (!result) throw new Error('No record found');

            return this.processSuccessfulResponse({ payload: result });
        } catch (error) {
            const processedError = {
                service: `${this.serviceName}.readRecords`,
                error: error.message,
            };

            return next(this.processFailedResponse({ message: processedError }));
        }
    }

    /**
     *
     * @typedef ProcessFailedResponseParameter
     * @property {string} message The error message
     * @property {number} code The status code
     */

    /**
     *
     * This methods is used to format all Failed responses and is called internally only
     * @method
     * @param {ProcessFailedResponseParameter} destructuredObject The instance of the
     * defined param object.
     * @returns {object} This always has error set to a string and payload to null.
     */
    processFailedResponse({ message }) {
        return {
            error: message,
            payload: null,
        };
    }

    /**
     *
     * @typedef ProcessSuccessfulResponseParameter
     * @property {object} payload The payload
     * @property {number} code The status code
     * @property {boolean} sendRawResponse defines response medium
     * @property {string} responseType A string defining the response type to return
     */

    /**
     *
     * This methods is used to format all successful responses and is called internally only
     * @method
     * @param {ProcessSuccessfulResponseParameter} destructuredObject The instance of the defined
     * param object
     * @returns {object} This always has error set to null and payload an object.
     */
    processSuccessfulResponse({
        payload,
        code = 200,
        sendRawResponse = false,
        responseType = 'application/json',
    }) {
        return {
            payload,
            error: null,
            responseType,
            sendRawResponse,
            status: code,
        };
    }
}

module.exports = JsonService;
