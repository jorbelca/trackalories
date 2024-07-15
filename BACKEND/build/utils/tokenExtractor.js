"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenExtractor = (request, response, next) => {
    let token;
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }
    if (token === null || token === undefined) {
        return response.status(401).json({ error: 'Token missing or invalid' });
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, config_1.SECRET);
    }
    catch (e) {
        return response.status(401).json({ error: 'Token missing, invalid or timed out' });
    }
    if (!decodedToken || !decodedToken.id) {
        return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const userId = decodedToken.id;
    request.body.userID = userId;
    next();
};
exports.default = tokenExtractor;
