/**
 * This handles all the required Express router configuration for the application.
 * @module ROUTES:Config
 */

const router = require('express').Router();
const { handle404, handleError, setupRequest, processResponse } = require('../middlewares/index');

/** Models Route Handlers */
const jsonRouteHandler = require('./json');

/** Cross Origin Handling */
router.use(setupRequest);
router.get('/', (request, response) => {
    response.set('Content-Type', 'text/html').status(200).send('<h1>Hello Server Running!</h1>');
});
router.use('/json', jsonRouteHandler);
router.use(processResponse);
router.use(handle404);
router.use(handleError);

module.exports = router;
