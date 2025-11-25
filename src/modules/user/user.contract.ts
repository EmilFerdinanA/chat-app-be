import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const User = z.object({
  id: z.string(),
  name: z.string(),
});

const CreateUserDto = z.object({
  name: z.string().min(2, "Name is required"),
});

export const userContract = c.router({
  getAllUser: {
    method: "GET",
    path: "/user",
    responses: {
      200: z.array(User),
    },
    summary: "Get all user",
  },

  getUserById: {
    method: "GET",
    path: "/user/:id",
    responses: {
      200: User,
      404: z.object({ message: z.string() }),
    },
    summary: "Get a user",
  },

  createUser: {
    method: "POST",
    path: "/user",
    body: CreateUserDto,
    responses: {
      201: User,
      400: z.object({ error: z.string() }),
    },
    summary: "Create a user",
  },
});
