"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPagingInformation(requestPage, requestPerPage) {
    const page = Number(requestPage) || 0;
    const perPage = Number(requestPerPage) || 0;
    const limit = perPage;
    const skip = page * perPage;
    const getTotalPages = function getTotalPages(count) {
        if (perPage === 0) {
            return 1;
        }
        else {
            return Math.ceil(count / perPage);
        }
    };
    return {
        limit,
        skip,
        totalPages: getTotalPages
    };
}
exports.default = getPagingInformation;
