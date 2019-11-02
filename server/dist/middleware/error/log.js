"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require("../../helpers/logger");
function logError() {
    function middleware(err, req, res, next) {
        logger.error(err.stack);
        next(err);
    }
    return middleware;
}
exports.default = logError;
;
