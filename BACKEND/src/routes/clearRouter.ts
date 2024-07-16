import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { MONGO } from "../config/config";
const clearRouter = express.Router();

clearRouter.post("/", async (_request: Request, response: Response) => {
  if (process.env.NODE_ENV === "test") {
    try {
      const conn = mongoose.createConnection(`${MONGO}`);
      const res: any = await conn.dropDatabase();

      if (res === true) {
        return response.status(200).json({ message: "Cleaned" });
      }
    } catch (e) {
      console.error(e);
      return response.status(400).json({ error: "Error cleaning database" });
    }
  } else {
    // Respuesta por defecto si no estás en modo test
    return response.status(400).json({ error: "Not in test environment" });
  }
  return;
});
export default clearRouter;
