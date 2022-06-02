import express from 'express'
import User from '../schemas/userSchema'


const personalRouter = express.Router()


personalRouter.get("/", async (request, response) => {
  const { userID } = request.body
  const returnedUser: any = await User.findById(userID)
  let { username, email, activity } = returnedUser

  if (!returnedUser || returnedUser === undefined) {
    return response.status(404).json({ error: "No data" })
  }

  try {
    return response.status(200).json({ username: username, email: email, activity: activity })
  } catch (error) {
    console.error(error)
    return response.status(400).send(error)
  }
})


// personalRouter.post('/', async (request, response) => {
//   const { date, userID, data } = request.body

//   const meal: any = await Entry.find({ date: date, user: userID })


//   if (meal.length > 0) {
//     meal[0].data = meal[0].data.concat(data)
//     try {
//       await meal[0].save()
//       return response.status(200).json(meal[0])
//     } catch (error) {
//       console.log(error)
//       return response.status(400)
//     }
//   }

//   const mealEntry = new Entry({
//     ...request.body,
//     user: userID
//   }
//   );

//   const user: any = await User.findById(userID)


//   user.entries = user.entries.concat(mealEntry._id)
//   try {
//     await mealEntry.save();
//     await user.save()

//     return response.status(200).json(mealEntry)


//   } catch (error) {
//     console.log(error)
//     return response.status(400)
//   }

// })


export default personalRouter