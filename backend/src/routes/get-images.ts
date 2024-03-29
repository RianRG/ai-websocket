import { FastifyInstance } from "fastify";
import { PrismaRepository } from "../repositories/prisma-repository";
import { GetImages } from "../use-cases/get-images";

export async function getImagesRoute(app: FastifyInstance){
  app.get('/images', async (req, res) =>{
    const prismaRepository = new PrismaRepository()
    const getImages = new GetImages(
      prismaRepository
    )

    return getImages.execute();
  })
}