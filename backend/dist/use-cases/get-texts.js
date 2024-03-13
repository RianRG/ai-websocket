"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTexts = void 0;
class GetTexts {
    database;
    constructor(database) {
        this.database = database;
    }
    ;
    execute() {
        return this.database.getTexts();
    }
}
exports.GetTexts = GetTexts;
