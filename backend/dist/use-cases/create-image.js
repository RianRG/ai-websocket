"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateImage = void 0;
class CreateImage {
    database;
    constructor(database) {
        this.database = database;
    }
    ;
    async execute(link, imageRequestId) {
        return this.database.createImage(link, imageRequestId);
    }
}
exports.CreateImage = CreateImage;
