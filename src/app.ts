import fastify from 'fastify';
import websocket from '@fastify/websocket'
import cors from '@fastify/cors'

const app = fastify();

app.register(cors, {
  origin: 'http://localhost:4200',
  credentials: true
})
app.register(websocket)

export { app };