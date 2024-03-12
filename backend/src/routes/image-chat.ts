import 'dotenv/config'

import { FastifyInstance } from "fastify";
import path from 'path';
import fs from 'fs'
import Replicate from 'replicate'
import { CreateImageRequest } from '../use-cases/create-image-request';
import { PrismaRepository } from '../repositories/prisma-repository';
import { CreateImage } from '../use-cases/create-image';

const replicate = new Replicate({
  auth: process.env.REPLICATE_TOKEN
})

export async function imageChat(app: FastifyInstance){
  app.get('/chat/images', { websocket: true }, async (connect, req) =>{

    const prismaRepository = new PrismaRepository();

    const createImageRequest = new CreateImageRequest(
      prismaRepository
    )
    const createImage = new CreateImage(
      prismaRepository
    )

    connect.socket.on('message', async (content: string) =>{
      content = content.toString()
      const imageRequest = await createImageRequest.execute(content);
      const output: any = await replicate.run(
        "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
        {
          input: {
            width: 768,
            height: 768,
            prompt: content,
            scheduler: "K_EULER",
            num_outputs: 1,
            guidance_scale: 7.5,
            num_inference_steps: 50
          }
        }
      );

      const fileLink = output[0];

      await createImage.execute(fileLink, imageRequest.id);
      connect.socket.send(fileLink);

    })
  })
}