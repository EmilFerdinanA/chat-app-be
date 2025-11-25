import express from "express";

import { connectDB } from "./lib/connectDB";
import { createExpressEndpoints } from "@ts-rest/express";
import { userRouter } from "./modules/user/user.router";
import { userContract } from "./modules/user/user.contract";

const app = express();
const port = 3000;
app.use(express.json());

connectDB();

createExpressEndpoints(userContract, userRouter, app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
