"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const db = require("mongoose");
const routes_1 = require("./routes");
const logger = require("./helpers/logger");
const middleware = require("./middleware");
const app = express();
// database connection
const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/dofusbuilds";
db.connect(mongodbUri, {
    autoReconnect: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
});
// setup the app middleware
middleware.app(app);
// setup the api
app.use('/', routes_1.default);
// setup the error middleware
middleware.error(app);
// 2052 without ssl
// 2053 with ssl
const port = process.env.PORT || 2053; //5000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
