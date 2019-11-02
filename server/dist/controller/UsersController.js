"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
const ErrorMessageHelper_1 = require("../helpers/ErrorMessageHelper");
// Tokens are valid as long as the server is not restarted. Might be a temporary solution. Might also be permanent
let usersToken = [];
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield require('bcrypt').hashSync(req.body.password, 10);
            const newUser = new User_1.default({
                idName: req.body.idName,
                email: req.body.email,
                password: hashedPassword,
                username: req.body.username,
            });
            newUser.save((err) => {
                if (err) {
                    // TODO Better error handling
                    res.status(400).send({ message: ErrorMessageHelper_1.default(err) });
                }
                else {
                    require('crypto').randomBytes(48, function (err, buffer) {
                        const token = buffer.toString('hex');
                        usersToken.push({ idName: req.body.idName, token: token });
                        res.status(201).send({ token: token });
                    });
                }
            });
        }
        catch (err) {
            next(err);
        }
    });
}
;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield resolveUser(req.body.idName);
            if (!user) {
                res.status(404).send('User account not found.');
            }
            else {
                // Compare hashed password received by the client with the one in the database
                if (yield require('bcrypt').compareSync(req.body.password, user.toDto().password)) {
                    let arrayFilterResult = usersToken.filter(obj => obj.idName === req.body.idName);
                    let token = null;
                    // User token doesn't exist
                    if (arrayFilterResult.length === 0) {
                        token = yield require('crypto').randomBytes(48).toString('hex');
                        usersToken.push({ idName: req.body.idName, token: token });
                        // User token exists
                    }
                    else if (arrayFilterResult.length === 1) {
                        token = arrayFilterResult[0].token;
                    }
                    else {
                        // Should never happen, but should be logged if it ever happens
                    }
                    // TODO do not send the hashed password to the client
                    res.status(201).send({
                        token: token,
                        user: user.toDto()
                    });
                }
                else {
                    res.status(401).send('Unauthorized.');
                }
            }
        }
        catch (err) {
            next(err);
        }
    });
}
;
function resolveUser(idName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield User_1.default.findOne({ idName });
        }
        catch (err) {
            return null;
        }
    });
}
exports.default = {
    createUser,
    login
};
