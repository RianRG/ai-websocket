"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoute = void 0;
require("dotenv/config");
const prisma_repository_1 = require("../repositories/prisma-repository");
const create_text_1 = require("../use-cases/create-text");
const prompt_1 = require("../prompt");
const replicate_1 = __importDefault(require("replicate"));
const replicate = new replicate_1.default({
    auth: process.env.REPLICATE_TOKEN
});
function chatRoute(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const connections = [];
        app.get('/chat', { websocket: true }, (connect, req) => __awaiter(this, void 0, void 0, function* () {
            const databaseRepository = new prisma_repository_1.PrismaRepository();
            const createText = new create_text_1.CreateText(databaseRepository);
            connections.push(connect.socket);
            connect.socket.on('message', (content) => __awaiter(this, void 0, void 0, function* () {
                var _a, e_1, _b, _c;
                content = content.toString();
                yield createText.execute({
                    content,
                    sender: 'User'
                });
                const input = {
                    debug: false,
                    top_k: 50,
                    top_p: 1,
                    prompt: content,
                    temperature: 0.01,
                    system_prompt: prompt_1.promptIA,
                    max_new_tokens: 500,
                    min_new_tokens: -1
                };
                let botAnswer = "";
                try {
                    for (var _d = true, _e = __asyncValues(replicate.stream("meta/llama-2-70b-chat", { input })), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                        _c = _f.value;
                        _d = false;
                        const event = _c;
                        botAnswer += event.toString();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                ;
                yield createText.execute({
                    content: botAnswer,
                    sender: 'Assistent'
                });
                connect.socket.send(botAnswer);
            }));
        }));
    });
}
exports.chatRoute = chatRoute;
