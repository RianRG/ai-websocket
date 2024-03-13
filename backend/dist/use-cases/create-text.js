"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateText = void 0;
class CreateText {
    database;
    constructor(database) {
        this.database = database;
    }
    ;
    async execute(body) {
        return this.database.createText(body);
    }
}
exports.CreateText = CreateText;
