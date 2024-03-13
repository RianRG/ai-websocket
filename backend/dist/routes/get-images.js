"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagesRoute = void 0;
const prisma_repository_1 = require("../repositories/prisma-repository");
const get_images_1 = require("../use-cases/get-images");
async function getImagesRoute(app) {
    app.get('/images', async (req, res) => {
        const prismaRepository = new prisma_repository_1.PrismaRepository();
        const getImages = new get_images_1.GetImages(prismaRepository);
        return getImages.execute();
    });
}
exports.getImagesRoute = getImagesRoute;
