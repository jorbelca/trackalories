import express, { Request, Response } from "express";
import Entry from "../schemas/entrySchema";
import User from "../schemas/userSchema";
import tokenExtractor from "../utils/tokenExtractor";

const mealsRouter = express.Router();

mealsRouter.get(
  "/",
  tokenExtractor,
  async (request: Request, response: Response) => {
    const { userID } = request.body;
    const meals = await Entry.find({ user: userID })
      .sort({ date: -1 })
      .populate("user", { username: 1 });

    response.status(200).json(meals);
  }
);

mealsRouter.post(
  "/",
  tokenExtractor,
  async (request: Request, response: Response) => {
    const { date, userID, data } = request.body;

    const meal: any = await Entry.find({ date, user: userID });

    if (meal.length > 0) {
      meal[0].data = meal[0].data.concat(data);
      try {
        await meal[0].save();
        return response.status(200).json(meal[0]);
      } catch (error) {
        console.log(error);
        return response.status(400);
      }
    }

    const mealEntry: any = new Entry({
      date,
      data,
      user: userID,
    });

    const user = await User.findById(userID);
    if (user != null) {
      // eslint-disable-next-line
      user.entries = user.entries.concat(mealEntry._id);
      try {
        // eslint-disable-next-line
        await mealEntry.save();
        await user.save();

        return response.status(200).json(mealEntry);
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .json({ error: "Error al guardar la comida" });
      }
    } else {
      return response.status(404).json({ error: "Usuario no encontrado" });
    }
  }
);

export default mealsRouter;
