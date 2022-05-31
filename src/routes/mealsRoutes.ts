import express from 'express'
import Entry from '../schemas/entrySchema';



const mealsRouter = express.Router()

mealsRouter.post('/', async (request, response) => {
  console.log(request.body);

  console.log("Meals");

  const mealEntry = new Entry(
    request.body
  );

  try {
    await mealEntry.save();

    response.status(200).json(mealEntry)


  } catch (error) {
    console.log(error)
    response.status(400)
  }

})

export default mealsRouter
