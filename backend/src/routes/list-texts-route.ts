import { FastifyInstance } from "fastify";
import { PrismaRepository } from "../repositories/prisma-repository";
import { ListTexts } from "../use-cases/list-texts";

export async function listTexts(app: FastifyInstance){
  app.get('/texts', async (req, res) =>{
    const prismaRepository = new PrismaRepository()

    const listTexts = new ListTexts(
      prismaRepository
    )

    return listTexts.execute();
  })
}