"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTexts = void 0;
class GetTexts {
    constructor(database) {
        this.database = database;
    }
    ;
    execute() {
        return this.database.getTexts();
    }
}
exports.GetTexts = GetTexts;
