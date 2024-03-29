import { SECRET } from '../config/config'
import jwt from 'jsonwebtoken'

const tokenExtractor = (request: any, response: any, next: any) => {
  let token
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  if (token === null || token === undefined) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }

  let decodedToken: any | string
  try { decodedToken = jwt.verify(token, SECRET) } catch (e) {
    return response.status(401).json({ error: 'Token missing, invalid or timed out' })
  }


  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }

  const userId = decodedToken.id

  request.body.userID = userId

  next()
}
export default tokenExtractor
