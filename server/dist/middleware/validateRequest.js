"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check = require("express-validator/check");
const logger = require("../helpers/logger");
function sendError(req, res, next) {
    const errors = check.validationResult(req);
    if (!errors.isEmpty()) {
        logger.debug('Request validation fail');
        res.status(400).send({ errors: errors.array() });
    }
    else {
        logger.debug('Request validation pass');
        next();
    }
}
exports.pagingValidations = [
    check.query('page').optional().isInt({ min: 0 }),
    check.query('perPage').optional().isInt({ min: 1 })
];
// return a middleware list
function validateRequest(checkList) {
    checkList.push(sendError);
    return checkList;
}
exports.validateRequest = validateRequest;
;
