import { FastifyInstance } from "fastify";
import { PrismaRepository } from "../repositories/prisma-repository";
import { GetTexts } from "../use-cases/get-texts";

export async function getTextsRoute(app: FastifyInstance){
  app.get('/texts', async (req, res) =>{
    const prismaRepository = new PrismaRepository()

    const getTexts = new GetTexts(
      prismaRepository
    )

    return getTexts.execute();
  })
}