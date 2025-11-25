import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const chatContract = c.router({
  getMessages: {
    method: "GET",
    path: "/chat/:id",
    responses: {
      200: z.array(
        z.object({
          text: z.string(),
          senderId: z.string(),
          receiverId: z.string(),
          createdAt: z.string(),
        })
      ),
    },
  },

  sendMessage: {
    method: "POST",
    path: "/chat/:id",
    body: z.object({
      text: z.string(),
    }),
    responses: {
      201: z.object({
        id: z.string(),
        text: z.string(),
        senderId: z.string(),
        receiverId: z.string(),
        createdAt: z.string(),
      }),
    },
  },
});
