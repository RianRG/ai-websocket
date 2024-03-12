import { FastifyInstance } from "fastify";
import { PrismaRepository } from "../repositories/prisma-repository";

export async function listTexts(app: FastifyInstance){
  app.get('/images', async (req, res) =>{
    
  })
}