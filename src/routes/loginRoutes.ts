import express from 'express'
const bcrypt = require('bcrypt');
import User from '../schemas/userSchema';
// const jwt = require("jsonwebtoken")


const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const user: any = await User.find({ email: email })

  const passwordCorrect = user === null ? false :
    await bcrypt.compare(password, user[0].password)


  try {
    if (passwordCorrect) response.status(200).json(user)

  } catch (error) {
    console.log(error)
  }

})

export default loginRouter
