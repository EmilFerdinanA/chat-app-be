import { initServer } from "@ts-rest/express";
import { userContract } from "./user.contract";
import { UserModel } from "./user.model";

const s = initServer();

export const userRouter = s.router(userContract, {
  getAllUser: async () => {
    const users = await UserModel.find();

    return {
      status: 200,
      body: users.map((user) => ({
        id: user._id.toString(),
        name: user.name,
      })),
    };
  },

  getUserById: async ({ params }) => {
    const user = await UserModel.findById(params.id);

    if (!user) {
      return {
        status: 404,
        body: { message: "User not found" },
      };
    }

    return {
      status: 200,
      body: {
        id: user?._id.toString(),
        name: user?.name,
      },
    };
  },

  createUser: async ({ body }) => {
    const user = await UserModel.create(body);

    return {
      status: 201,
      body: {
        id: user._id.toString(),
        name: user.name,
      },
    };
  },
});
