import express, { Request, Response } from "express";
import { SALT_ROUNDS } from "../config/config";
import User from "../schemas/userSchema";
import bcrypt from "bcrypt";
const registerRouter = express.Router();

registerRouter.post("/", async (request: Request, response: Response) => {
  const { password } = request.body;

  if (!password || password === undefined) {
    return response.status(400).json({ error: "Password field is wrong" });
  } else if (password.length < 3) {
    return response.status(400).json({
      error: "The password must have at least 3 characters of length",
    });
  }

  // ENCRIPTING PASSWORD
  const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);

  const newUser = new User({
    ...request.body,
    password: passwordHash,
  });

  try {
    await newUser.save();

    return response.status(200).send("Registered");
  } catch (error) {
    console.error(error);
    return response.status(400).send(error);
  }
});

export default registerRouter;
