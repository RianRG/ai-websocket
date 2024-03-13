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
exports.getImageRequestsRoute = void 0;
const prisma_repository_1 = require("../repositories/prisma-repository");
const get_image_requests_1 = require("../use-cases/get-image-requests");
function getImageRequestsRoute(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('/image-requests', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const prismaRepository = new prisma_repository_1.PrismaRepository();
            const getImageRequests = new get_image_requests_1.GetImageRequests(prismaRepository);
            return getImageRequests.execute();
        }));
    });
}
exports.getImageRequestsRoute = getImageRequestsRoute;
