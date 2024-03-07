import { FastifyInstance } from "fastify";

export async function chatRoute(app: FastifyInstance){

  app.get('/chat', { websocket: true }, async (connect, req) =>{
    
  })
}