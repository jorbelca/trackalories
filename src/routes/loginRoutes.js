import express from 'express'
import bcrypt from 'bcrypt'
import User from '../schemas/userSchema.js'
import { SECRET } from '../../configEnv.js'
import jwt from 'jsonwebtoken'


const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body
  try {
    const returnedUser = await User.find({ email: email })

    if (returnedUser.length === 0 || !returnedUser || returnedUser === undefined) {
      return response.status(404).json({ error: "No data in the DB" })
    }

    let user = returnedUser[0]

    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)

    let userToken

    if (passwordCorrect) userToken = {
      email: user.email,
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userToken, SECRET, {
      expiresIn: 60 * 60 * 24 * 2,
    }, { algorithm: 'RS256' })


    return response.status(200).json({ token: token })

  } catch (error) {
    console.log(error)
    return response.status(400).send(error)
  }

})

export default loginRouter
