import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { MONGO } from "../config/config";
const clearRouter = express.Router();

clearRouter.post("/", async (_request: Request, response: Response) => {
  if (process.env.NODE_ENV === "test") {
    try {
      const connection = mongoose.createConnection(`${MONGO}`);
      await connection.dropDatabase();

      return response.status(200).json({ message: "Cleaned" });
    } catch (e) {
      console.error(e);
      return response.status(400).json({ error: "Error cleaning database" });
    }
  } else {
    // Respuesta por defecto si no estás en modo test
    return response.status(400).json({ error: "Not in test environment" });
  }
});

export default clearRouter;
