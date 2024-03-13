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

  async createImage(link: string, imageRequestId: string){
    return await this.image.create({
      data: {
        link,
        imageRequestId
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
    const images = await this.image.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })

   return Promise.all(images.map(async data =>{
    const request = await this.imageRequest.findUnique({
      where: {
        id: data.imageRequestId
      }
    })

    if(!request)
      throw new Error('request not found!');

    return {
      id: data.id,
      createdAt: data.createdAt,
      link: data.link,
      imageRequest: request.content
    }
   }))
  }

  async getImageRequests(){
    return await this.imageRequest.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })
  }
}