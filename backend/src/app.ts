import fastify from 'fastify';
import websocket from '@fastify/websocket'
import cors from '@fastify/cors'
import { chatRoute } from './routes/chat';
import { listTexts } from './routes/get-texts';
import { imageChat } from './routes/image-chat';

const app = fastify();

app.register(cors, {
  origin: 'http://localhost:4200',
  credentials: true
})
app.register(websocket)

app.register(chatRoute)
app.register(listTexts)
app.register(imageChat)

export { app };