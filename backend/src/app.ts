import fastify from 'fastify';
import websocket from '@fastify/websocket'
import cors from '@fastify/cors'
import { chatRoute } from './routes/chat';
import { listTexts } from './routes/list-texts-route';

const app = fastify();

app.register(cors, {
  origin: 'http://localhost:4200',
  credentials: true
})
app.register(websocket)

app.register(chatRoute)
app.register(listTexts)

export { app };