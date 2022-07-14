import express from "express";
import Operation from "../schemas/operationsSchema.js";
import User from "../schemas/userSchema.js";
import tokenExtractor from "../utils/tokenExtractor.js";

const eliminateUserRouter = express.Router()

eliminateUserRouter.delete('/', tokenExtractor, async (request, response) => {
  const { userID } = request.body

  try {


    const returnedUser = await User.findByIdAndDelete(userID)

    if (returnedUser.length === 0 || !returnedUser || returnedUser === undefined) {
      return response.status(404).json({ error: "No user" })
    }
    const operations = await Operation.deleteMany({ user: userID })
    if (operations.length === 0 || !operations || operations === undefined) {
      return response.status(404).json({ error: "No data of operations" })
    }


    return response.status(200).json({ message: 'Erased from the DB' })
  } catch (error) {
    console.error(error)
    return response.status(400).send(error)
  }

})

export default eliminateUserRouter