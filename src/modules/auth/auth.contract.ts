import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { LoginDto, RegisterDto } from "./auth.dto";
import { User } from "./auth.dao";

const c = initContract();

export const authContract = c.router({
  register: {
    method: "POST",
    path: "/auth/register",
    body: RegisterDto,
    responses: {
      201: z.object({
        status: z.literal(201),
        message: z.string(),
        data: User,
      }),
      400: z.object({
        status: z.literal(400),
        message: z.string(),
      }),
    },
    summary: "Register user",
  },

  login: {
    method: "POST",
    path: "/auth/login",
    body: LoginDto,
    responses: {
      200: z.object({
        status: z.literal(200),
        message: z.string(),
        data: z.object({
          token: z.string(),
          user: User,
        }),
      }),
      401: z.object({
        status: z.literal(401),
        message: z.string(),
      }),
    },
    summary: "Login user",
  },
});
