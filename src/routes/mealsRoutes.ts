import express from 'express'
import Entry from '../schemas/entrySchema';
import User from '../schemas/userSchema';
import getDay from '../utils/getDate';

const mealsRouter = express.Router()

mealsRouter.get("/", async (_request, response) => {
  const meals = await Entry.find({}).populate("user", { username: 1 })

  response.status(200).json(meals)
})



mealsRouter.post('/', async (request, response) => {
  const { date, userID, data } = request.body

  if (date === getDay()) {

    const meal: any = await Entry.find({ date: date, user: userID })

    meal[0].data = meal[0].data.concat(data[0])

    try {
      await meal[0].save()
      return response.status(200).json(meal[0])
    } catch (error) {
      console.log(error)
      return response.status(400)
    }


  }

  const mealEntry = new Entry({
    ...request.body,
    user: userID
  }
  );

  const user: any = await User.findById(userID)


  user.entries = user.entries.concat(mealEntry._id)
  try {
    await mealEntry.save();
    await user.save()

    return response.status(200).json(mealEntry)


  } catch (error) {
    console.log(error)
    return response.status(400)
  }

})

export default mealsRouter
