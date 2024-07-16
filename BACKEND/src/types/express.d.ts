import * as express from "express";
import { User } from "./types.ts";
import { Request } from "express";
import { Express } from "express-serve-static-core";

declare global {
  namespace Express {
    interface Request {
      userID?: string;
    }
  }
}

export interface CustomRequest extends Request {
  body: {
    userID?: string;
    username?: string;
    email?: string;
    password?: string;
    activity?: string;
    locked: any;
    cancel: any;
    getReader: any;
    pipeThrough: any;
    pipeTo: any;
    tee: any;
    cache: any;
    credentials: any;
    destination: any;
    integrity: any;
  };
}
