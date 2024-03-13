"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageChat = void 0;
require("dotenv/config");
const replicate_1 = __importDefault(require("replicate"));
const create_image_request_1 = require("../use-cases/create-image-request");
const prisma_repository_1 = require("../repositories/prisma-repository");
const create_image_1 = require("../use-cases/create-image");
const replicate = new replicate_1.default({
    auth: process.env.REPLICATE_TOKEN
});
async function imageChat(app) {
    app.get('/chat/images', { websocket: true }, async (connect, req) => {
        const prismaRepository = new prisma_repository_1.PrismaRepository();
        const createImageRequest = new create_image_request_1.CreateImageRequest(prismaRepository);
        const createImage = new create_image_1.CreateImage(prismaRepository);
        connect.socket.on('message', async (content) => {
            content = content.toString();
            const imageRequest = await createImageRequest.execute(content);
            const output = await replicate.run("stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", {
                input: {
                    width: 768,
                    height: 768,
                    prompt: content,
                    scheduler: "K_EULER",
                    num_outputs: 1,
                    guidance_scale: 7.5,
                    num_inference_steps: 50
                }
            });
            const fileLink = output[0];
            await createImage.execute(fileLink, imageRequest.id);
            connect.socket.send(fileLink);
        });
    });
}
exports.imageChat = imageChat;
