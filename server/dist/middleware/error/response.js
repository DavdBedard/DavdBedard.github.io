"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendErrorResponse() {
    function middleware(err, req, res, next) {
        if (process.env.NODE_ENV === 'production') {
            res.status(500).send();
        }
        else {
            res.status(500).send({ message: err.stack });
        }
    }
    return middleware;
}
exports.default = sendErrorResponse;
;
