"use strict";
//
// LOG LEVEL EXPLANATION
// Error is for error to look out but that doesn't cause app aborting
// Warn can be an error you don't mind
// Info is for tracking what app does regularly
// Debug is for logs that help you understand what's up
//
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const moment = require("moment");
const { createLogger, format, transports } = winston;
const customWinstonLevels = winston.config.npm;
winston.addColors(customWinstonLevels.colors);
const colorizer = format.colorize();
const formatMessage = function formatMessage(info) {
    const timestamp = moment().format();
    const level = (`[${info.level.toUpperCase()}]`);
    const { message } = info;
    return `${timestamp}: ${colorizer.colorize(info.level, `${level} ${message}`)}`;
};
exports.winstonLogger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    levels: customWinstonLevels.levels,
    transports: [
        new transports.Console({ format: format.printf(info => formatMessage(info)) })
    ]
});
const buildMessage = function buildMessage(...args) {
    let message = '';
    args.forEach((element, index) => {
        if (index !== 0)
            message += '\n';
        if (typeof element === 'object') {
            message += JSON.stringify(element, null, 2);
        }
        else {
            message += element;
        }
    });
    return message;
};
exports.error = function error(...args) {
    exports.winstonLogger.error(buildMessage(...args));
};
exports.warn = function warn(...args) {
    exports.winstonLogger.warn(buildMessage(...args));
};
exports.info = function info(...args) {
    exports.winstonLogger.info(buildMessage(...args));
};
exports.debug = function debug(...args) {
    exports.winstonLogger.debug(buildMessage(...args));
};
exports.info('Logging configured using Winston.');
