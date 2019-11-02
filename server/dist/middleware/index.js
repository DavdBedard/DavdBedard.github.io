"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const logRequest_1 = require("./logRequest");
const log_1 = require("./error/log");
const response_1 = require("./error/response");
// app level middlewares
exports.app = function appMiddleware(app) {
    // 3rd party middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    // Header protections: anti-dns prefetch, anti-clickjacking, ie download exploit prevention,
    // hide the "powered by: express", HSTS, no sniff on mime and small xss protections
    app.use(helmet());
    const cookieParser = require('cookie-parser');
    app.use(cookieParser());
    // custom middleware
    app.use(logRequest_1.default());
};
// error middlewares
exports.error = function errorMiddleware(app) {
    app.use(log_1.default());
    app.use(response_1.default());
};
