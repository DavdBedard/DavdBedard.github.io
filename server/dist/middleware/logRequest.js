"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const morgan = require("morgan");
const logger = require("../helpers/logger");
class Logger {
    write(text) {
        logger.info(text);
    }
}
;
function logRequest() {
    const stream = new Logger;
    return morgan('dev', { stream });
}
exports.default = logRequest;
;
