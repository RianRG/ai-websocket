import fastify from 'fastify';
import websocket from '@fastify/websocket'
import cors from '@fastify/cors'
import { chatRoute } from './routes/chat';
import { getTextsRoute } from './routes/get-texts';
import { imageChat } from './routes/image-chat';
import { getImagesRoute } from './routes/get-images';
import { getImageRequestsRoute } from './routes/get-image-requests';

const app = fastify();

app.register(cors, {
  origin: 'http://localhost:4200',
  credentials: true
})
app.register(websocket)

app.register(chatRoute)
app.register(getTextsRoute)
app.register(imageChat)
app.register(getImagesRoute)
app.register(getImageRequestsRoute)

export { app };