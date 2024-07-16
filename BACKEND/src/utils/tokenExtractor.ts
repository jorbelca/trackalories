import { Request, Response, NextFunction } from "express";
import { SECRET } from "../config/config";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomBody {
  userID?: string;
  username?: string;
  email?: string;
  password?: string;
  activity?: string;
}
interface CustomRequest extends Request {
  body: CustomBody;
}

const tokenExtractor = (
  request: CustomRequest,
  response: Response,
  next: NextFunction
) => {
  let token;
  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }
  if (token === null || token === undefined) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  let decodedToken: JwtPayload;
  try {
    decodedToken = jwt.verify(token, SECRET) as JwtPayload;
  } catch (e) {
    return response
      .status(401)
      .json({ error: "Token missing, invalid or timed out" });
  }

  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  request.body.userID = decodedToken.id;

  next();
  return;
};
export default tokenExtractor;
