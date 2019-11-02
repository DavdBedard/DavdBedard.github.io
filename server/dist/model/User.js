"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    idName: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
userSchema.index({ tags: 1 }, { collation: { locale: "en", strength: 2 } });
userSchema.methods.toDto = function toDto() {
    const dto = {
        idName: this.idName,
        password: this.password,
        username: this.username,
        email: this.email,
        registrationDate: this.createdAt && this.createdAt.getTime()
    };
    return dto;
};
const model = mongoose.model('User', userSchema);
exports.default = model;
