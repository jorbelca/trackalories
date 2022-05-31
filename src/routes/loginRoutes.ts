import express from 'express'
import { SECRET } from '../config/config';
const bcrypt = require('bcrypt');
import User from '../schemas/userSchema';
const jwt = require("jsonwebtoken")


const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const returnedUser: any = await User.find({ email: email })
  let user = returnedUser[0]

  const passwordCorrect = user === null ? false :
    await bcrypt.compare(password, user.password)

  let userToken

  if (passwordCorrect) userToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userToken, SECRET, {
    expiresIn: 60 * 60 * 24 * 5,
  })
  console.log(user);

  try {
    response.status(200).json({
      username: user.username,
      email: user.email,
      activity: user.activity,
      weight: user.weight,
      token
    })

  } catch (error) {
    console.log(error)
  }

})

export default loginRouter
