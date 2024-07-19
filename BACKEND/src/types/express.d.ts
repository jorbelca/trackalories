import { Request } from "express";

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
