import * as dotenv from "dotenv";
import { Secret } from "jsonwebtoken";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../../.env") });

export let PORT: number | string | undefined;
export let MONGO: string | undefined;
export const SECRET: string | Secret | any = process.env.SECRET;
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

const nodeEnv = process.env.NODE_ENV || "development";
switch (nodeEnv) {
  case "development":
    MONGO = process.env.MONGO_URI;
    PORT = process.env.PORT;
    break;
  case "test":
    MONGO = process.env.MONGO_URI_TEST;
    PORT = process.env.PORT_TEST;
    break;
  case "production":
    MONGO = process.env.MONGO_URI_PROD;
    PORT = process.env.PORT_PROD;
    break;
  default:
    throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`);
}
