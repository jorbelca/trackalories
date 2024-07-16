"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const entrySchema_1 = __importDefault(require("../schemas/entrySchema"));
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const tokenExtractor_1 = __importDefault(require("../utils/tokenExtractor"));
const eliminateUserRouter = express_1.default.Router();
eliminateUserRouter.delete('/', tokenExtractor_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = request.body;
    const returnedUser = yield userSchema_1.default.findByIdAndDelete(userID);
    yield entrySchema_1.default.find({ user: userID }).deleteMany();
    if (returnedUser.length === 0 ||
        !returnedUser ||
        returnedUser === undefined) {
        return response.status(404).json({ error: 'No data' });
    }
    try {
        return response.status(200).json({ message: 'Erased from the DB' });
    }
    catch (error) {
        console.error(error);
        return response.status(400).send(error);
    }
}));
exports.default = eliminateUserRouter;
