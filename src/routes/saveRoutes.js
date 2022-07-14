import express from 'express'
import Operation from '../schemas/operationsSchema.js';
import User from '../schemas/userSchema.js'
import getTime from '../utils/getTime.js';
import tokenExtractor from '../utils/tokenExtractor.js';

const saveRouter = express.Router()


saveRouter.post('/', tokenExtractor, async (request, response) => {
  const { url, selector, time, initialData, userID } = request.body

  if (userID == null || undefined) { return response.status(400).send('No user identified') }
  const entryAlreadyInDB = await Operation.find({ url: url, selector: selector, user: userID })

  if (entryAlreadyInDB.length > 0) {

    try {
      const res = await Operation.updateOne({ selector: selector, user: userID, url: url },
        { $push: { data: { date: getTime(), data: initialData } } })

      return response.status(200).send('OK')
    } catch (error) {
      console.error(error);

      return response.status(400).send(error)
    }


  }
  const newEntry = new Operation({
    ...request.body,
    data: [{ date: getTime(), data: initialData }]
    , user: userID
  })

  try {
    // ENTRY SAVE
    const res = await newEntry.save()
    // USER OPERATIONS SAVE
    await User.updateOne({ _id: userID }, { $push: { operations: res._id } })

    return response.status(200).json('Saved!')
  } catch (error) {
    console.error(error);

    return response.status(400).send(error)
  }



});

export default saveRouter


