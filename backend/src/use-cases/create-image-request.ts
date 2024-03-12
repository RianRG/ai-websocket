import { PrismaRepository } from "../repositories/prisma-repository";

export class CreateImageRequest{

  constructor(private database: PrismaRepository){};

  async execute(content: string){
    return this.database.createImageRequest(content);
  }
}