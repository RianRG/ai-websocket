import 'dotenv/config'

import { FastifyInstance } from "fastify";
import path from 'path';
import fs from 'fs'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_TOKEN
})

export async function imageChat(app: FastifyInstance){
  app.get('/chat/images', { websocket: true }, async (connect, req) =>{
    connect.socket.on('message', async (content: string) =>{
      content = content.toString()

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

      const response: any = await fetch(fileLink);
      const buffer = await response.buffer();
      const splitter = fileLink.split('/');
      const fileName = splitter[splitter.length-1]
      const uploadDestination = path.resolve(__dirname, '../tmp', fileName);
      await fs.promises.writeFile(uploadDestination, buffer);

      const base64Image = buffer.toString('base64')

      connect.socket.send(JSON.stringify(base64Image));

    })
  })
}