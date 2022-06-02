"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const jwt = require("jsonwebtoken");
const tokenExtractor = (request, response, next) => {
    let token = "";
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        token = authorization.substring(7);
    }
    const decodedToken = jwt.verify(token, config_1.SECRET);
    if (!token || !decodedToken.id) {
        return response.status(401).send("Token missing or invalid");
    }
    const userId = decodedToken.id;
    request.body.userID = userId;
    next();
};
module.exports = tokenExtractor;
