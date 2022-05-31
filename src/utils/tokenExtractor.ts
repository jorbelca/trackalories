import { SECRET } from "../config/config"

const jwt = require("jsonwebtoken")

const tokenExtractor = (request: any, response: any, next: any) => {

  let token = ""
  const authorization = request.get("authorization")

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "Token missing or invalid" })
  }

  const userId = decodedToken.id

  request.body.userID = userId

  next()
}
module.exports = tokenExtractor