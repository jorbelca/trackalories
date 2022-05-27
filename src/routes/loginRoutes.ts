import express from 'express'
import mongoose from 'mongoose';
import User from '../schemas/userSchema';
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")

const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  // const { email, password } = request.body

  const user = await User.findOne(request.body)

  // const passwordCorrect =
  //   user === null ? false : await bcrypt.compare(password, email.passwordHash)

  try {

    response.status(200).json(user)
    mongoose.connection.close()

  } catch (error) {
    console.log(error)
  }

})

export default loginRouter
