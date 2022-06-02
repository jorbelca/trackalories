import express from 'express'
import User from '../schemas/userSchema'
import getDay from '../utils/getDate'

const weightRouter = express.Router()

weightRouter.get("/", async (request, response) => {
  const { userID } = request.body
  const returnedUser: any = await User.findById(userID)
  let weight = returnedUser.weight

  if (!returnedUser || returnedUser === undefined) {
    return response.status(404).json({ error: "No data" })
  }

  try {
    return response.status(200).json(weight)
  } catch (error) {
    console.error(error)
    return response.status(400).send(error)
  }

})

weightRouter.post('/', async (request, response) => {
  const { weight, date, userID } = request.body

  if (date == getDay()) {
    return response.status(400).json({ error: "Only one weight post per day" })
  }

  const user: any = await User.findById(userID)


  user.weight = user.weight.concat({ date: date, weight: weight })

  console.log(user);

  try {
    await user.save();

    return response.status(200).json(user)

  } catch (error) {
    console.log(error)
    return response.status(400)
  }

})

export default weightRouter