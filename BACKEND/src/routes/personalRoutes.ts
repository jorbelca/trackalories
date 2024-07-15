import express from 'express'
import { SALT_ROUNDS } from '../config/config'
import User from '../schemas/userSchema'
import { User as UserType } from '../types/types'
import tokenExtractor from '../utils/tokenExtractor'
import bcrypt from 'bcrypt'

const personalRouter = express.Router()

personalRouter.get('/', tokenExtractor, async (request, response) => {
  const { userID } = request.body
  const returnedUser: UserType | any = await User.findById(userID)
  if (!returnedUser || returnedUser === undefined || returnedUser === null) {
    return response.status(404).json({ error: 'No User' })
  }
  const { username, email, activity, height, weight, birthdate, sex } = returnedUser

  try {
    return response.status(200).json({
      username: username,
      email: email,
      activity: activity,
      height: height,
      weight: weight,
      sex: sex,
      birthdate: birthdate
    })
  } catch (error) {
    console.error(error)
    return response.status(400).send(error)
  }
})

personalRouter.put('/', tokenExtractor, async (request, response) => {
  let { userID, username, email, password, activity } = request.body

  const returnedUser: any = await User.findById(userID)

  if (!returnedUser || returnedUser === undefined || returnedUser === null) {
    return response.status(404).json({ error: 'No User' })
  }

  if (password !== undefined) password = bcrypt.hashSync(password, SALT_ROUNDS)

  await User.findByIdAndUpdate(userID, {
    username: username,
    email: email,
    activity: activity,
    password
  }, { runValidators: true, context: 'query' })

  try {
    return response.status(200).send('Done!')
  } catch (error) {
    console.error(error)
    return response.status(400).send(error)
  }
})

export default personalRouter
