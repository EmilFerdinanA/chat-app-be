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
});
