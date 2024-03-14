import { app } from "./app";

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) :  5000
}).then(() => console.log('runnin on 5000'));