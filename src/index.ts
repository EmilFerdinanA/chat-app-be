import express from "express";

import { connectDB } from "./lib/connectDB";
import { createExpressEndpoints } from "@ts-rest/express";
import { userRouter } from "./modules/user/user.router";
import { userContract } from "./modules/user/user.contract";
import { createServer } from "http";
import { Server } from "socket.io";
import { chatContract } from "./modules/chat/chat.contract";
import { ChatRouter } from "./modules/chat/chat.router";

const app = express();
const port = 3000;

app.use(express.json());

const server = createServer(app);
export const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});

connectDB();

createExpressEndpoints(userContract, userRouter, app);
createExpressEndpoints(chatContract, ChatRouter, app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
