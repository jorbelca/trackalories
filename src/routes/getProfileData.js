import express from 'express'
import { SALT_ROUNDS } from '../../configEnv.js'
import User from '../schemas/userSchema.js'
import bcrypt from 'bcrypt'
import tokenExtractor from '../utils/tokenExtractor.js'

const profileRouter = express.Router()

profileRouter.post('/', tokenExtractor, async (request, response) => {
  const { userID } = request.body
  try {
    const user = await User.findById(userID)
    if (user) return response.status(200).send(user)
  } catch (error) {
    return response.status(400).send(error)
  }
})


profileRouter.put('/', tokenExtractor, async (request, response) => {
  const { newData, userID } = request.body
  try {
    const userDB = await User.findById(userID)

    if (newData.password !== null) { newData.password = bcrypt.hashSync(newData.password, SALT_ROUNDS) } else {
      newData.password = userDB.password
    }


    const userUpdated = await User.findOneAndUpdate({ _id: userID }, {
      username: newData.username,
      email: newData.email,
      password: newData.password
    }, { runValidators: true })

    if (userUpdated) return response.status(200).json('Done!')
  } catch (error) {
    console.log(error);
    return response.status(400).send(error)
  }
})


export default profileRouter