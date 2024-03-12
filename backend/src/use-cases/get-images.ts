import { PrismaRepository } from "../repositories/prisma-repository";

export class GetImages{
  constructor(private database: PrismaRepository){};

  execute(){
    return this.database.getImages();
  }
}