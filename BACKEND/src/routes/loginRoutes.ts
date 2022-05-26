import express from 'express'

const loginRouter = express.Router()

loginRouter.post('/', (req, res) => {
  console.log(req.body);

  console.log("LOGIN");

  res.send('Response to LOGIN POST')
})

export default loginRouter
