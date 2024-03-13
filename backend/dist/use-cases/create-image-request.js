"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateImageRequest = void 0;
class CreateImageRequest {
    database;
    constructor(database) {
        this.database = database;
    }
    ;
    async execute(content) {
        return this.database.createImageRequest(content);
    }
}
exports.CreateImageRequest = CreateImageRequest;
