"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const UsersController_1 = require("./controller/UsersController");
const BuildsController_1 = require("./controller/BuildsController");
const root_1 = require("./controller/root");
const router = express.Router();
// Resolve parameters
//router.param('userId', usersCtrl.resolveUser);
// Root route
router.get('/', root_1.default.get);
// Login routes
router.post('/login', UsersController_1.default.login);
// Signup route
router.post('/users', UsersController_1.default.createUser);
// Build routes
router.post('/builds', BuildsController_1.default.saveBuild);
router.get('/builds/:id', BuildsController_1.default.getBuild);
router.get("/", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});
exports.default = router;
