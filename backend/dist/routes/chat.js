"use strict";
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
async function chatRoute(app) {
    const connections = [];
    app.get('/chat', { websocket: true }, async (connect, req) => {
        const databaseRepository = new prisma_repository_1.PrismaRepository();
        const createText = new create_text_1.CreateText(databaseRepository);
        connections.push(connect.socket);
        connect.socket.on('message', async (content) => {
            content = content.toString();
            await createText.execute({
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
            for await (const event of replicate.stream("meta/llama-2-70b-chat", { input })) {
                botAnswer += event.toString();
            }
            ;
            await createText.execute({
                content: botAnswer,
                sender: 'Assistent'
            });
            connect.socket.send(botAnswer);
        });
    });
}
exports.chatRoute = chatRoute;
