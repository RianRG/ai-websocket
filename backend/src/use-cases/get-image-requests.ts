import { PrismaRepository } from "../repositories/prisma-repository";

export class GetImageRequests{
  constructor(private database: PrismaRepository){};

  execute(){
    return this.database.getImageRequests();
  }
}