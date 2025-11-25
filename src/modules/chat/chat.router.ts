import { initServer } from "@ts-rest/express";
import { chatContract } from "./chat.contract";
import { ChatModel } from "./chat.model";
import { io } from "../../index";

const s = initServer();

export const ChatRouter = s.router(chatContract, {
  getMessages: async ({ params, req }) => {
    const userHeader = req.headers["x-user-id"];
    const currentUser = Array.isArray(userHeader) ? userHeader[0] : userHeader;

    if (!currentUser) {
      return { status: 400, body: { error: "Missing x-user-id header" } };
    }

    const messages = await ChatModel.find({
      $or: [
        { senderId: currentUser, receiverId: params.id },
        { senderId: params.id, receiverId: currentUser },
      ],
    }).sort({ createdAt: 1 });

    return {
      status: 200,
      body: messages.map((msg) => ({
        text: msg.text,
        senderId: msg.senderId.toString(),
        receiverId: msg.receiverId.toString(),
        createdAt: msg.createdAt.toISOString(),
      })),
    };
  },

  sendMessage: async ({ params, body, req }) => {
    const userHeader = req.headers["x-user-id"];
    const currentUser = Array.isArray(userHeader) ? userHeader[0] : userHeader;

    if (!currentUser) {
      return { status: 400, body: { error: "Missing x-user-id header" } };
    }

    const message = await ChatModel.create({
      text: body.text,
      senderId: currentUser,
      receiverId: params.id,
    });

    // ⬇ kirim realtime ke frontend
    io.emit("new-message", {
      id: message._id.toString(),
      text: message.text,
      senderId: message.senderId.toString(),
      receiverId: message.receiverId.toString(),
      createdAt: message.createdAt.toISOString(),
    });

    return {
      status: 201,
      body: {
        id: message._id.toString(),
        text: message.text,
        senderId: message.senderId.toString(),
        receiverId: message.receiverId.toString(),
        createdAt: message.createdAt.toISOString(),
      },
    };
  },
});
