"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaRepository = void 0;
const client_1 = require("@prisma/client");
class PrismaRepository extends client_1.PrismaClient {
    async createText({ sender, content }) {
        return await this.text.create({
            data: {
                sender,
                content
            }
        });
    }
    async getTexts() {
        return await this.text.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });
    }
    async createImage(link, imageRequestId) {
        return await this.image.create({
            data: {
                link,
                imageRequestId
            }
        });
    }
    async createImageRequest(content) {
        return await this.imageRequest.create({
            data: {
                content
            }
        });
    }
    async getImages() {
        const images = await this.image.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });
        return Promise.all(images.map(async (data) => {
            const request = await this.imageRequest.findUnique({
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
        }));
    }
    async getImageRequests() {
        return await this.imageRequest.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });
    }
}
exports.PrismaRepository = PrismaRepository;
