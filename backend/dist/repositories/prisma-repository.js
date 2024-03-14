"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/repositories/prisma-repository.ts
var prisma_repository_exports = {};
__export(prisma_repository_exports, {
  PrismaRepository: () => PrismaRepository
});
module.exports = __toCommonJS(prisma_repository_exports);
var import_client = require("@prisma/client");
var PrismaRepository = class extends import_client.PrismaClient {
  async createText({ sender, content }) {
    return await this.text.create({
      data: {
        sender,
        content
      }
    });
  }
  async getTexts() {
    return await this.text.findMany({
      orderBy: {
        createdAt: "asc"
      }
    });
  }
  async createImage(link, imageRequestId) {
    return await this.image.create({
      data: {
        link,
        imageRequestId
      }
    });
  }
  async createImageRequest(content) {
    return await this.imageRequest.create({
      data: {
        content
      }
    });
  }
  async getImages() {
    const images = await this.image.findMany({
      orderBy: {
        createdAt: "asc"
      }
    });
    return Promise.all(images.map(async (data) => {
      const request = await this.imageRequest.findUnique({
        where: {
          id: data.imageRequestId
        }
      });
      if (!request)
        throw new Error("request not found!");
      return {
        id: data.id,
        createdAt: data.createdAt,
        link: data.link,
        imageRequest: request.content
      };
    }));
  }
  async getImageRequests() {
    return await this.imageRequest.findMany({
      orderBy: {
        createdAt: "asc"
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrismaRepository
});
