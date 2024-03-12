import { PrismaRepository } from "../repositories/prisma-repository";

export class CreateImage{
  constructor(private database: PrismaRepository){};

  async execute(link: string){
    return this.database.createImage(link);
  }
}