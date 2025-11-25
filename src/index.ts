import express from "express";
import { createExpressEndpoints, initServer } from "@ts-rest/express";

import { pokemonContract } from "./contract.ts";

const app = express();
const port = 3000;
app.use(express.json());

const s = initServer();

const router = s.router(pokemonContract, {
  getPokemon: async ({ params: { id } }) => {
    return {
      status: 200,
      body: { name: id },
    };
  },
});

createExpressEndpoints(pokemonContract, router, app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
