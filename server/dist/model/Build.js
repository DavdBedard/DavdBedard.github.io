"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const buildSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    createdBy: {
        type: String,
        required: true
    },
    likes: {
        type: String,
        required: false
    },
    dislikes: {
        type: String,
        required: false
    },
    weapon: {
        type: String,
        required: true
    },
    hat: {
        type: String,
        required: true
    },
    belt: {
        type: String,
        required: true
    },
    ringOne: {
        type: String,
        required: true
    },
    ringTwo: {
        type: String,
        required: true
    },
    boots: {
        type: String,
        required: true
    },
    amulet: {
        type: String,
        required: true
    },
    shield: {
        type: String,
        required: true
    },
    cloak: {
        type: String,
        required: true
    },
    pet: {
        type: String,
        required: true
    },
    dofusOne: {
        type: String,
        required: true
    },
    dofusTwo: {
        type: String,
        required: true
    },
    dofusThree: {
        type: String,
        required: true
    },
    dofusFour: {
        type: String,
        required: true
    },
    dofusFive: {
        type: String,
        required: true
    },
    dofusSix: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
buildSchema.index({ tags: 1 }, { collation: { locale: "en", strength: 2 } });
buildSchema.methods.toDto = function toDto() {
    const dto = {
        id: this.id,
        createdBy: this.createdBy,
        creationDate: this.createdAt,
        likes: this.likes,
        dislikes: this.dislikes,
        weapon: this.weapon,
        hat: this.hat,
        belt: this.belt,
        ringOne: this.ringOne,
        ringTwo: this.ringTwo,
        boots: this.boots,
        amulet: this.amulet,
        shield: this.shield,
        cloak: this.cloak,
        pet: this.pet,
        dofusOne: this.dofusOne,
        dofusTwo: this.dofusTwo,
        dofusThree: this.dofusThree,
        dofusFour: this.dofusFour,
        dofusFive: this.dofusFive,
        dofusSix: this.dofusSix
    };
    return dto;
};
const model = mongoose.model('Build', buildSchema);
exports.default = model;
