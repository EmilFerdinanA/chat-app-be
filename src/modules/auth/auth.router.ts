import { initServer } from "@ts-rest/express";
import { authContract } from "./auth.contract";
import { UserModel } from "./auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const s = initServer();

export const userRouter = s.router(authContract, {
  register: async ({ body, req }) => {
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

  login: async ({ body, req, res }) => {
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

    const token = jwt.sign({ id: user._id, email: user.email }, "test key", {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
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
