import express from 'express'
import mongoose from 'mongoose';
import User from '../schemas/userSchema';

const registerRouter = express.Router()

registerRouter.post('/', async (req, res) => {
  console.log(req.body);

  console.log("Register");

  const user = new User(
    req.body
  );
  await user.save();

  res.send('Response to REGISTER POST')

  mongoose.connection.close()
})

export default registerRouter
