import express from "express";
import Operation from "../schemas/operationsSchema.js";
import User from "../schemas/userSchema.js";
import tokenExtractor from "../utils/tokenExtractor.js";

const eliminateOpsRouter = express.Router()

eliminateOpsRouter.delete('/:id',tokenExtractor, async (request, response) => {
  const { id } = request.params
  const { userID } = request.body

  try {
    const returnedOperation = await Operation.findByIdAndDelete(id)

    if (returnedOperation.length === 0 || !returnedOperation || returnedOperation === undefined) {
      return response.status(404).json({ error: "No operation" })
    }

    const user = await User.findById(userID)
    if (user.length === 0 || !user || user === undefined) {
      return response.status(404).json({ error: "No data of operations for this user" })
    } else {
      user.operations = user.operations.filter(n => n != id)
    }
    await user.save()
    return response.status(200).json({ message: 'Erased from the DB' })
  } catch (error) {
    console.error(error)
    return response.status(400).send(error)
  }

})

export default eliminateOpsRouter