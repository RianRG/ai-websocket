"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetImageRequests = void 0;
class GetImageRequests {
    constructor(database) {
        this.database = database;
    }
    ;
    execute() {
        return this.database.getImageRequests();
    }
}
exports.GetImageRequests = GetImageRequests;
