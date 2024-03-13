"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextsRoute = void 0;
const prisma_repository_1 = require("../repositories/prisma-repository");
const get_texts_1 = require("../use-cases/get-texts");
async function getTextsRoute(app) {
    app.get('/texts', async (req, res) => {
        const prismaRepository = new prisma_repository_1.PrismaRepository();
        const getTexts = new get_texts_1.GetTexts(prismaRepository);
        return getTexts.execute();
    });
}
exports.getTextsRoute = getTextsRoute;
