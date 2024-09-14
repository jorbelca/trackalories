import express, { Request, Response } from "express";
import User from "../schemas/userSchema";
import tokenExtractor from "../utils/tokenExtractor";

const weightRouter = express.Router();

weightRouter.get(
  "/",
  tokenExtractor,
  async (request: Request, response: Response) => {
    try {
      const { userID } = request.body; // O considera obtener userID de request.userID si lo extraes del token
      const returnedUser = await User.findById(userID);

      if (!returnedUser) {
        return response.status(404).json({ error: "No User" });
      }

      const { weight } = returnedUser;
      return response.status(200).json(weight);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: "Error fetching user weight" });
    }
  }
);

weightRouter.post(
  "/",
  tokenExtractor,
  async (request: Request, response: Response) => {
    try {
      const { weight, date } = request.body;
      const { userID } = request.body; // O de nuevo, podrías extraerlo de request.userID si lo manejas así en tokenExtractor

      const user = await User.findById(userID);

      if (!user) {
        return response.status(404).json({ error: "Usuario no encontrado" });
      }

      // Inicializa 'weight' como un arreglo si es null o undefined
      if (!Array.isArray(user.weight)) {
        user.weight = [];
      }

      // Verificar si ya hay un registro de peso en la misma fecha
      if (user.weight.length > 0) {
        const lastWeightDate = user.weight[user.weight.length - 1].date;

        if (
          new Date(date).toDateString() ===
          new Date(lastWeightDate).toDateString()
        ) {
          return response
            .status(400)
            .json({ error: "Only one weight post per day" });
        }
      }

      // Añadir nuevo registro de peso
      user.weight.push({ date, weight });

      // Guardar el usuario actualizado
      await user.save();

      return response
        .status(200)
        .json({ username: user.username, weight: user.weight });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: "Error al guardar el peso" });
    }
  }
);

export default weightRouter;
