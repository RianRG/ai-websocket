"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.app.listen({
    port: 5000
}).then(() => console.log('runnin on 5000'));