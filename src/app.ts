import express, { Express } from "express";
import cors from "cors";
import routes from "./routes";


const app = express();

app
    .use(cors())
    .use(express.json())
    .use(routes);

export function init(): Promise<Express> {
  return Promise.resolve(app);
}

export default app;
