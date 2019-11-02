"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Get clean error message for the most possibles mongoose / mongodb errors
function getErrorMessage(err) {
    if (err.name === 'MongoError') {
        if (err.code === 11000) {
            return 'This element already exists in the database (DuplicateKey)';
        }
        else {
            return err.errmsg;
        }
    }
    else {
        return err.message;
    }
}
exports.default = getErrorMessage;
