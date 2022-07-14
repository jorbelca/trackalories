import express from 'express'
import Operation from '../schemas/operationsSchema.js';
import tokenExtractor from '../utils/tokenExtractor.js';
const changeTimeRouter = express.Router()


changeTimeRouter.post('/:id', tokenExtractor, async (request, response) => {
  const { id } = request.params
  const { time, userID } = request.body
  try {
    const newTimeDB = await Operation.findOneAndUpdate({ _id: id }, { time: time }, { new: true })


    if (newTimeDB.time === +time) return response.status(200).send('Saved');
  } catch (error) {
    console.error(error);

    return response.status(400).send(error)
  }

});


export default changeTimeRouter