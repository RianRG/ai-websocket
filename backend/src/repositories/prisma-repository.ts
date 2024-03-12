import { PrismaClient } from "@prisma/client";
import { IText } from "../interfaces/IText";


export class PrismaRepository extends PrismaClient{
  async createText({ sender, content }: IText){
    return await this.text.create({
      data: {
        sender,
        content
      }
    })
  }

  async getTexts(){
    return await this.text.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })
  }

  async createImage(link: string){
    return await this.image.create({
      data: {
        link
      }
    })
  }

  async createImageRequest(content: string){
    return await this.imageRequest.create({
      data: {
        content
      }
    })
  }

  async getImages(){
    return await this.image.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })
  }
}