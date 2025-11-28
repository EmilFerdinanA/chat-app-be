import { generateOpenApi } from "@ts-rest/open-api";
import { authContract } from "./modules/auth/auth.contract";
import { chatContract } from "./modules/chat/chat.contract";

export const openApiDocument = generateOpenApi(
  {
    auth: authContract,
    chat: chatContract,
  },
  {
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Auto generated from ts-rest",
    },
    servers: [{ url: "http://localhost:3000", description: "Local dev" }],
  }
);
