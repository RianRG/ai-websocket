import { IText } from "../interfaces/IText";
import { PrismaRepository } from "../repositories/prisma-repository";

export class CreateText{
  constructor(private database: PrismaRepository){};

  async execute(body: IText){
    return this.database.createText(body)
  }
}