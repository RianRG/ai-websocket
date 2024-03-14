"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.app.listen({
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 5000
}).then(() => console.log('runnin on 5000'));
