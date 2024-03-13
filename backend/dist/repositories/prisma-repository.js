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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaRepository = void 0;
const client_1 = require("@prisma/client");
class PrismaRepository extends client_1.PrismaClient {
    createText({ sender, content }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.text.create({
                data: {
                    sender,
                    content
                }
            });
        });
    }
    getTexts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.text.findMany({
                orderBy: {
                    createdAt: 'asc'
                }
            });
        });
    }
    createImage(link, imageRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.image.create({
                data: {
                    link,
                    imageRequestId
                }
            });
        });
    }
    createImageRequest(content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.imageRequest.create({
                data: {
                    content
                }
            });
        });
    }
    getImages() {
        return __awaiter(this, void 0, void 0, function* () {
            const images = yield this.image.findMany({
                orderBy: {
                    createdAt: 'asc'
                }
            });
            return Promise.all(images.map((data) => __awaiter(this, void 0, void 0, function* () {
                const request = yield this.imageRequest.findUnique({
                    where: {
                        id: data.imageRequestId
                    }
                });
                if (!request)
                    throw new Error('request not found!');
                return {
                    id: data.id,
                    createdAt: data.createdAt,
                    link: data.link,
                    imageRequest: request.content
                };
            })));
        });
    }
    getImageRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.imageRequest.findMany({
                orderBy: {
                    createdAt: 'asc'
                }
            });
        });
    }
}
exports.PrismaRepository = PrismaRepository;
