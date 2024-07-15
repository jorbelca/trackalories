import express from 'express'
import User from '../schemas/userSchema'
import tokenExtractor from '../utils/tokenExtractor'

const weightRouter = express.Router()

weightRouter.get('/', tokenExtractor, async (request, response) => {
  const { userID } = request.body


  const returnedUser: any = await User.findById(userID)
  if (!returnedUser || returnedUser === undefined || returnedUser === null) {
    return response.status(404).json({ error: 'No User' })
  }


  const weight = returnedUser.weight


  try {
    return response.status(200).json(weight)
  } catch (error) {
    console.error(error)
    return response.status(400).send(error)
  }
})

weightRouter.post('/', tokenExtractor, async (request, response) => {
  const { weight, date, userID } = request.body

  const user: any = await User.findById(userID)

  const lastWeight = user.weight[user.weight.length - 1].date

  // eslint-disable-next-line
  if (date == lastWeight) {
    return response.status(400).json({ error: 'Only one weight post per day' })
  }
  user.weight = user.weight.concat({ date: date, weight: weight })

  try {
    await User.updateOne({ _id: userID }, { weight: user.weight })

    return response.status(200).json({ username: user.username, weight: user.weight })
  } catch (error) {
    console.log(error)
    return response.status(400)
  }
})

export default weightRouter
