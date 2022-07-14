import express from 'express'

import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../../configEnv.js';
import User from '../schemas/userSchema.js';
const registerRouter = express.Router()

registerRouter.post('/', async (request, response) => {
  const { password } = request.body

  if (!password || password === undefined) {
    return response.status(400).json({ error: "Password field is wrong" })
  } else if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "The password must have at least 3 characters of length" })
  }

  // ENCRIPTING PASSWORD
  const passwordHash = await bcrypt.hashSync(password, SALT_ROUNDS)

  const newUser = new User({
    ...request.body,
    password: passwordHash,
  })


  const dbResponse = await newUser.save()
  try {

    if (dbResponse) return response.status(200).send(dbResponse)

  } catch (error) {
    console.error(error);
    response.status(400).send(error)

  }

})

export default registerRouter
