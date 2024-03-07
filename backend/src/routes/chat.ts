import 'dotenv/config';

import { FastifyInstance } from "fastify";
import { PrismaRepository } from "../repositories/prisma-repository";
import { CreateText } from "../use-cases/create-text";
import { IText } from "../interfaces/IText";
import { promptIA } from "../prompt";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_TOKEN
});

export async function chatRoute(app: FastifyInstance){
  const connections: WebSocket[] = [];
  let text: string="";
  app.get('/chat', { websocket: true }, async (connect, req) =>{
    const databaseRepository = new PrismaRepository();

    const createText = new CreateText(
      databaseRepository
    )

    connections.push(connect.socket);

    connect.socket.on('message', async (content: string) =>{
      await createText.execute({
        content: content.toString(),
        sender: 'User'
      })

      const input = {
        debug: false,
        top_k: 50,
        top_p: 1,
        prompt: text,
        temperature: 0.01,
        system_prompt: promptIA,
        max_new_tokens: 500,
        min_new_tokens: -1
      };

      let botAnswer = "";

      for await (const event of replicate.stream("meta/llama-2-70b-chat", { input })) {
        botAnswer+=event.toString();
      };

      await createText.execute({
        content: botAnswer,
        sender: 'Assistent'
      })

      connect.socket.send(botAnswer);
    })

    
  })
}