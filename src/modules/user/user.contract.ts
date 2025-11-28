import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const User = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

const RegisterDto = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userContract = c.router({
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
