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
const Build_1 = require("../model/Build");
const ErrorMessageHelper_1 = require("../helpers/ErrorMessageHelper");
function saveBuild(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const build = new Build_1.default({
                id: require('shortid').generate(),
                createdBy: req.body.createdBy,
                creationDate: req.body.createdAt,
                likes: 0,
                dislikes: 0,
                weapon: req.body.weapon,
                hat: req.body.hat,
                belt: req.body.belt,
                ringOne: req.body.ringOne,
                ringTwo: req.body.ringTwo,
                boots: req.body.boots,
                amulet: req.body.amulet,
                shield: req.body.shield,
                cloak: req.body.cloak,
                pet: req.body.pet,
                dofusOne: req.body.dofusOne,
                dofusTwo: req.body.dofusTwo,
                dofusThree: req.body.dofusThree,
                dofusFour: req.body.dofusFour,
                dofusFive: req.body.dofusFive,
                dofusSix: req.body.dofusSix
            });
            build.save((err) => {
                if (err) {
                    // TODO Better error handling
                    res.status(400).send({ message: ErrorMessageHelper_1.default(err) });
                }
                else {
                    res.status(201).send(build.id);
                }
            });
        }
        catch (err) {
            next(err);
        }
    });
}
;
function getBuild(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const build = yield Build_1.default.findOne({ id: req.params.id });
            if (build) {
                res.status(200).send(build.toDto());
            }
            else {
                res.status(404).send('Build not found.');
            }
        }
        catch (err) {
            next(err);
        }
    });
}
exports.default = {
    saveBuild,
    getBuild
};
