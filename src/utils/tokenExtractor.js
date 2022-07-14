import { SECRET } from "../../configEnv.js"
import jwt from "jsonwebtoken"

const tokenExtractor = (request, response, next) => {
  let token
  const authorization = request.get("authorization")

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7)
  }
  if (token === null || token === undefined) {

    return response.status(401).json({ error: "Token missing or invalid" })
  }

  const decodedToken = jwt.verify(token, SECRET, { algorithm: 'RS256' })

  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: "Token missing or invalid" })
  }

  const userId = decodedToken.id
  const username = decodedToken.username
  const email = decodedToken.email

  request.body.userID = userId
  request.body.username = username
  request.body.email = email
  next()
}
export default tokenExtractor