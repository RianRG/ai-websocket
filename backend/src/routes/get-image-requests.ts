import { FastifyInstance } from "fastify";
import { PrismaRepository } from "../repositories/prisma-repository";
import { GetImageRequests } from "../use-cases/get-image-requests";

export async function getImageRequestsRoute(app: FastifyInstance){
  app.get('/images', async (req, res) =>{
    const prismaRepository = new PrismaRepository()
    const getImageRequests = new GetImageRequests(
      prismaRepository
    )

    return getImageRequests.execute();
  })
}