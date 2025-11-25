import express from "express";

import { connectDB } from "./lib/connectDB.ts";
import { createExpressEndpoints } from "@ts-rest/express";
import { userRouter } from "./modules/user/user.router.ts";
import { userContract } from "./modules/user/user.contract.ts";

const app = express();
const port = 3000;
app.use(express.json());

connectDB();

createExpressEndpoints(userContract, userRouter, app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
