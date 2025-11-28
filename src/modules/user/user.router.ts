import { initServer } from "@ts-rest/express";
import { userContract } from "./user.contract";
import { UserModel } from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  login: async ({ body }) => {
    const user = await UserModel.findOne({ email: body.email });
    if (!user) {
      return {
        status: 401,
        body: {
          status: 401,
          message: "Invalid credential",
        },
      };
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      return {
        status: 401,
        body: {
          status: 401,
          message: "Invalid credential",
        },
      };
    }

    const token = jwt.sign({ id: user._id, emaiil: user.email }, "test key", {
      expiresIn: "7d",
    });

    return {
      status: 200,
      body: {
        status: 200,
        message: "Login success",
        data: {
          token,
          user: {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          },
        },
      },
    };
  },
});
