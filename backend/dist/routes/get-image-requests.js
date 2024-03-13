"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageRequestsRoute = void 0;
const prisma_repository_1 = require("../repositories/prisma-repository");
const get_image_requests_1 = require("../use-cases/get-image-requests");
async function getImageRequestsRoute(app) {
    app.get('/image-requests', async (req, res) => {
        const prismaRepository = new prisma_repository_1.PrismaRepository();
        const getImageRequests = new get_image_requests_1.GetImageRequests(prismaRepository);
        return getImageRequests.execute();
    });
}
exports.getImageRequestsRoute = getImageRequestsRoute;
