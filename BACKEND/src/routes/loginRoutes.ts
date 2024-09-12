import express, { Request, Response } from "express";
import { SECRET } from "../config/config";
import User from "../schemas/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginRouter = express.Router();

loginRouter.post("/", async (request: Request, response: Response) => {
  const { email, password } = request.body;

  // Buscar el usuario por email
  const returnedUser = await User.findOne({ email });

  // Si el usuario no existe
  if (!returnedUser) {
    return response.status(404).send("No data in the DB");
  }

  // Verificar la contraseña
  const passwordCorrect = await bcrypt.compare(password, returnedUser.password);

  if (!passwordCorrect) {
    return response.status(400).send("Wrong password");
  }

  // Si la contraseña es correcta, generar un token
  const userToken = {
    username: returnedUser.username,
    id: returnedUser._id,
  };

  const token = jwt.sign(userToken, SECRET, {
    expiresIn: 60 * 60 * 24 * 5, // 5 días
  });

  try {
    return response.status(200).json({
      username: returnedUser.username,
      email: returnedUser.email,
      activity: returnedUser.activity,
      height: returnedUser.height,
      weight: returnedUser.weight,
      sex: returnedUser.sex,
      birthdate: returnedUser.birthdate,
      token,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send("Server error");
  }
});

export default loginRouter;
