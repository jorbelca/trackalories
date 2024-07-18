import express, { Request, Response } from "express";
import { SECRET } from "../config/config";
import User from "../schemas/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginRouter = express.Router();

loginRouter.post("/", async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const returnedUser = await User.find({ email });

  if (
    returnedUser.length === 0 ||
    !returnedUser ||
    returnedUser === undefined
  ) {
    return response.status(404).send("No data in the DB");
  }

  const user = returnedUser[0];

  let passwordCorrect;
  if (user === null) {
    passwordCorrect = false;
    return response.status(400).send("Wrong password");
  } else {
    passwordCorrect = true;
    bcrypt.compare(password, user.password.toString());
  }

  let userToken: any;

  if (passwordCorrect) {
    userToken = {
      username: user.username,
      id: user._id,
    };
  }

  const token = jwt.sign(userToken, SECRET, {
    expiresIn: 60 * 60 * 24 * 5,
  });

  try {
    return response.status(200).json({
      username: user.username,
      email: user.email,
      activity: user.activity,
      height: user.height,
      weight: user.weight,
      sex: user.sex,
      birthdate: user.birthdate,
      token,
    });
  } catch (error) {
    console.log(error);
    return response.status(400).send(error);
  }
});

export default loginRouter;
