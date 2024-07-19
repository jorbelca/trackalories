import { Secret } from "jsonwebtoken";

if (!process.env.SECRET) {
  throw new Error("SECRET environment variable is not defined");
}
if (!process.env.SALT_ROUNDS) {
  throw new Error("SALT_ROUNDS environment variable is not defined");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO environment variable is not defined");
}
if (!process.env.PORT) {
  throw new Error("PORT environment variable is not defined");
}

if (!process.env.MONGO_URI_TEST) {
  throw new Error("MONGO TEST environment variable is not defined");
}
if (!process.env.PORT_TEST) {
  throw new Error("PORT TEST environment variable is not defined");
}

export const SECRET: string | Secret = process.env.SECRET;
export const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS);

export let PORT: number | string | undefined;
export let MONGO: string | undefined;

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
    throw new Error(`'NODE_ENV' ${nodeEnv} is not handled!`);
}
