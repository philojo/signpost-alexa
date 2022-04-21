/**
 * This handles the Json routes declaration in the application
 * @module ROUTES:Json
 */
const router = require('express').Router();

const JsonService = require('../services/json');

const jsonService = new JsonService();

try {
    router
        .get('/', async (request, response, next) => {
            request.payload = await jsonService.readRecords({ request, next });
            next();
        })
        .post('/', async (request, response, next) => {})
        .put('/:id', async (request, response, next) => {})
        .delete('/', async (request, response, next) => {});
} catch (e) {
    console.log(`[Route Error] /json: ${JSON.stringify(e, 0, 4)}`);
} finally {
    module.exports = router;
}
