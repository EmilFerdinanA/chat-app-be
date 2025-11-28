import express from "express";

import { connectDB } from "./lib/connectDB";
import { createExpressEndpoints } from "@ts-rest/express";
import { userRouter } from "./modules/auth/auth.router";
import { authContract } from "./modules/auth/auth.contract";
import { createServer } from "http";
import { Server } from "socket.io";
import { chatContract } from "./modules/chat/chat.contract";
import { ChatRouter } from "./modules/chat/chat.router";
import cors from "cors";
import { authMiddleware } from "./middleware/auth.middleware";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const server = createServer(app);
export const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});

connectDB();

app.use(authMiddleware);
createExpressEndpoints(authContract, userRouter, app);
createExpressEndpoints(chatContract, ChatRouter, app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
