import { initServer } from "@ts-rest/express";
import { userContract } from "./user.contract";
import { UserModel } from "./user.model";
import bcrypt from "bcrypt";

const s = initServer();

export const userRouter = s.router(userContract, {
  register: async ({ body }) => {
    const exist = await UserModel.findOne({ email: body.email });

    if (exist) {
      return {
        status: 400,
        body: {
          status: 400,
          message: "Email already registered",
        },
      };
    }

    const hashed = await bcrypt.hash(body.password, 10);

    const user = await UserModel.create({
      name: body.name,
      email: body.email,
      password: hashed,
    });

    return {
      status: 201,
      body: {
        status: 201,
        message: "Success create user",
        data: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        },
      },
    };
  },
});
