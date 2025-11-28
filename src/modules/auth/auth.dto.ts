import { z } from "zod";

const RegisterDto = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export { RegisterDto, LoginDto };
