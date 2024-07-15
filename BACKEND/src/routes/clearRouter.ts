import express from 'express'
import mongoose from 'mongoose'
import { MONGO } from '../config/config'
const clearRouter = express.Router()

clearRouter.post('/', async (_request, response) => {
  if (process.env.NODE_ENV === 'test') {
    try {
      const conn = mongoose.createConnection(`${MONGO}`)
      const res: any = await conn.dropDatabase()

      if (res === true) return response.status(200).json({ message: 'Cleaned' })
    } catch (e) {
      console.log(e)
      return response.status(400)
    }
  }
})
export default clearRouter
