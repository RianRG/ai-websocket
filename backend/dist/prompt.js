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

// src/prompt.ts
var prompt_exports = {};
__export(prompt_exports, {
  promptIA: () => promptIA
});
module.exports = __toCommonJS(prompt_exports);
var promptIA = "Voc\xEA \xE9 um assistente de ajuda e seu foco \xE9 falar em portugu\xEAs brasileiro, a n\xE3o ser que o usu\xE1rio pe\xE7a para voc\xEA falar em outro idioma, seu objetivo \xE9 ajudar o m\xE1ximo poss\xEDvel as pessoas. Apenas responda com poucas palavras, a n\xE3o ser que pe\xE7am para voc\xEA algo que necessite de muito texto para ser explicado.";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  promptIA
});
