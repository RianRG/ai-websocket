"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetImages = void 0;
class GetImages {
    database;
    constructor(database) {
        this.database = database;
    }
    ;
    execute() {
        return this.database.getImages();
    }
}
exports.GetImages = GetImages;
