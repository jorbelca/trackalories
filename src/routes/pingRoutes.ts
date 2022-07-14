import express from 'express'

const pingRouter = express.Router()

pingRouter.get("/", async (_request, response) => {

  response.status(200).json({ message: "PONG" })
})


export default pingRouter