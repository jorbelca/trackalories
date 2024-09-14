import express, { Request, Response } from "express";
import Entry from "../schemas/entrySchema";
import User from "../schemas/userSchema";
import tokenExtractor from "../utils/tokenExtractor";

const eliminateUserRouter = express.Router();

eliminateUserRouter.delete(
  "/",
  tokenExtractor,
  async (request: Request, response: Response) => {
    const { userID } = request.body;

    try {
      // Eliminamos el usuario
      const returnedUser = await User.findByIdAndDelete(userID);

      // Si no se encuentra el usuario, devolvemos 404
      if (!returnedUser) {
        return response.status(404).json({ error: "No data" });
      }

      // Eliminamos todas las entradas relacionadas con el usuario
      await Entry.deleteMany({ user: userID });

      // Enviamos respuesta exitosa
      return response.status(200).json({ message: "Erased from the DB" });
    } catch (error) {
      console.error(error);
      return response.status(400).send(error);
    }
  }
);

export default eliminateUserRouter;
