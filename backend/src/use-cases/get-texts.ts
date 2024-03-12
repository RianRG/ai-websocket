import { PrismaRepository } from "../repositories/prisma-repository";

export class GetTexts{
  constructor(private database: PrismaRepository){};

  execute(){
    return this.database.getTexts();
  }
}