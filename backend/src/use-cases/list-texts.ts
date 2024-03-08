import { PrismaRepository } from "../repositories/prisma-repository";

export class ListTexts{
  constructor(private database: PrismaRepository){};

  execute(){
    return this.database.listTexts()
  }
}