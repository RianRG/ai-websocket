"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/dotenv@16.4.5/node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/dotenv@16.4.5/node_modules/dotenv/package.json"(exports2, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.4.5",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        "test:coverage": "tap --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@definitelytyped/dtslint": "^0.0.133",
        "@types/node": "^18.11.3",
        decache: "^4.6.1",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.5.0",
        tap: "^16.3.0",
        tar: "^6.1.11",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/.pnpm/dotenv@16.4.5/node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/.pnpm/dotenv@16.4.5/node_modules/dotenv/lib/main.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var crypto = require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path2 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path2, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path2} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config,
      decrypt,
      parse,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// node_modules/.pnpm/dotenv@16.4.5/node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/.pnpm/dotenv@16.4.5/node_modules/dotenv/lib/env-options.js"(exports2, module2) {
    "use strict";
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
      options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
    }
    module2.exports = options;
  }
});

// node_modules/.pnpm/dotenv@16.4.5/node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/.pnpm/dotenv@16.4.5/node_modules/dotenv/lib/cli-options.js"(exports2, module2) {
    "use strict";
    var re = /^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/;
    module2.exports = function optionMatcher(args) {
      return args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
    };
  }
});

// src/app.ts
var import_fastify = __toESM(require("fastify"));
var import_websocket = __toESM(require("@fastify/websocket"));
var import_cors = __toESM(require("@fastify/cors"));

// node_modules/.pnpm/dotenv@16.4.5/node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// src/repositories/prisma-repository.ts
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

// src/use-cases/create-text.ts
var CreateText = class {
  constructor(database) {
    this.database = database;
  }
  async execute(body) {
    return this.database.createText(body);
  }
};

// src/prompt.ts
var promptIA = "Voc\xEA \xE9 um assistente de ajuda e seu foco \xE9 falar em portugu\xEAs brasileiro, a n\xE3o ser que o usu\xE1rio pe\xE7a para voc\xEA falar em outro idioma, seu objetivo \xE9 ajudar o m\xE1ximo poss\xEDvel as pessoas. Apenas responda com poucas palavras, a n\xE3o ser que pe\xE7am para voc\xEA algo que necessite de muito texto para ser explicado.";

// src/routes/chat.ts
var import_replicate = __toESM(require("replicate"));
var replicate = new import_replicate.default({
  auth: process.env.REPLICATE_TOKEN
});
async function chatRoute(app2) {
  const connections = [];
  app2.get("/chat", { websocket: true }, async (connect, req) => {
    const databaseRepository = new PrismaRepository();
    const createText = new CreateText(
      databaseRepository
    );
    connections.push(connect.socket);
    connect.socket.on("message", async (content) => {
      content = content.toString();
      await createText.execute({
        content,
        sender: "User"
      });
      const input = {
        debug: false,
        top_k: 50,
        top_p: 1,
        prompt: content,
        temperature: 0.01,
        system_prompt: promptIA,
        max_new_tokens: 500,
        min_new_tokens: -1
      };
      let botAnswer = "";
      for await (const event of replicate.stream("meta/llama-2-70b-chat", { input })) {
        botAnswer += event.toString();
      }
      ;
      await createText.execute({
        content: botAnswer,
        sender: "Assistent"
      });
      connect.socket.send(botAnswer);
    });
  });
}

// src/use-cases/get-texts.ts
var GetTexts = class {
  constructor(database) {
    this.database = database;
  }
  execute() {
    return this.database.getTexts();
  }
};

// src/routes/get-texts.ts
async function getTextsRoute(app2) {
  app2.get("/texts", async (req, res) => {
    const prismaRepository = new PrismaRepository();
    const getTexts = new GetTexts(
      prismaRepository
    );
    return getTexts.execute();
  });
}

// src/routes/image-chat.ts
var import_replicate2 = __toESM(require("replicate"));

// src/use-cases/create-image-request.ts
var CreateImageRequest = class {
  constructor(database) {
    this.database = database;
  }
  async execute(content) {
    return this.database.createImageRequest(content);
  }
};

// src/use-cases/create-image.ts
var CreateImage = class {
  constructor(database) {
    this.database = database;
  }
  async execute(link, imageRequestId) {
    return this.database.createImage(link, imageRequestId);
  }
};

// src/routes/image-chat.ts
var replicate2 = new import_replicate2.default({
  auth: process.env.REPLICATE_TOKEN
});
async function imageChat(app2) {
  app2.get("/chat/images", { websocket: true }, async (connect, req) => {
    const prismaRepository = new PrismaRepository();
    const createImageRequest = new CreateImageRequest(
      prismaRepository
    );
    const createImage = new CreateImage(
      prismaRepository
    );
    connect.socket.on("message", async (content) => {
      content = content.toString();
      const imageRequest = await createImageRequest.execute(content);
      const output = await replicate2.run(
        "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
        {
          input: {
            width: 768,
            height: 768,
            prompt: content,
            scheduler: "K_EULER",
            num_outputs: 1,
            guidance_scale: 7.5,
            num_inference_steps: 50
          }
        }
      );
      const fileLink = output[0];
      await createImage.execute(fileLink, imageRequest.id);
      connect.socket.send(fileLink);
    });
  });
}

// src/use-cases/get-images.ts
var GetImages = class {
  constructor(database) {
    this.database = database;
  }
  execute() {
    return this.database.getImages();
  }
};

// src/routes/get-images.ts
async function getImagesRoute(app2) {
  app2.get("/images", async (req, res) => {
    const prismaRepository = new PrismaRepository();
    const getImages = new GetImages(
      prismaRepository
    );
    return getImages.execute();
  });
}

// src/use-cases/get-image-requests.ts
var GetImageRequests = class {
  constructor(database) {
    this.database = database;
  }
  execute() {
    return this.database.getImageRequests();
  }
};

// src/routes/get-image-requests.ts
async function getImageRequestsRoute(app2) {
  app2.get("/image-requests", async (req, res) => {
    const prismaRepository = new PrismaRepository();
    const getImageRequests = new GetImageRequests(
      prismaRepository
    );
    return getImageRequests.execute();
  });
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_cors.default, {
  origin: "http://localhost:4200",
  credentials: true
});
app.register(import_websocket.default);
app.register(chatRoute);
app.register(getTextsRoute);
app.register(imageChat);
app.register(getImagesRoute);
app.register(getImageRequestsRoute);

// src/server.ts
app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 5e3
}).then(() => console.log("runnin on 5000"));
