"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const websocket_1 = __importDefault(require("@fastify/websocket"));
const cors_1 = __importDefault(require("@fastify/cors"));
const chat_1 = require("./routes/chat");
const get_texts_1 = require("./routes/get-texts");
const image_chat_1 = require("./routes/image-chat");
const get_images_1 = require("./routes/get-images");
const get_image_requests_1 = require("./routes/get-image-requests");
const app = (0, fastify_1.default)();
exports.app = app;
app.register(cors_1.default, {
    origin: 'http://localhost:4200',
    credentials: true
});
app.register(websocket_1.default);
app.register(chat_1.chatRoute);
app.register(get_texts_1.getTextsRoute);
app.register(image_chat_1.imageChat);
app.register(get_images_1.getImagesRoute);
app.register(get_image_requests_1.getImageRequestsRoute);
