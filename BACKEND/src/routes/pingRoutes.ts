import express, { Request, Response } from "express";

const pingRouter = express.Router();

pingRouter.get("/", async (_request: Request, response: Response) => {
  response.status(200).json({ message: "PONG" });
});

export default pingRouter;
