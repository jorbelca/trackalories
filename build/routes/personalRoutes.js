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
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const personalRouter = express_1.default.Router();
personalRouter.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = request.body;
    const returnedUser = yield userSchema_1.default.findById(userID);
    let { username, email, activity } = returnedUser;
    if (!returnedUser || returnedUser === undefined) {
        return response.status(404).json({ error: "No data" });
    }
    try {
        return response.status(200).json({ username: username, email: email, activity: activity });
    }
    catch (error) {
        console.error(error);
        return response.status(400).send(error);
    }
}));
// personalRouter.post('/', async (request, response) => {
//   const { date, userID, data } = request.body
//   const meal: any = await Entry.find({ date: date, user: userID })
//   if (meal.length > 0) {
//     meal[0].data = meal[0].data.concat(data)
//     try {
//       await meal[0].save()
//       return response.status(200).json(meal[0])
//     } catch (error) {
//       console.log(error)
//       return response.status(400)
//     }
//   }
//   const mealEntry = new Entry({
//     ...request.body,
//     user: userID
//   }
//   );
//   const user: any = await User.findById(userID)
//   user.entries = user.entries.concat(mealEntry._id)
//   try {
//     await mealEntry.save();
//     await user.save()
//     return response.status(200).json(mealEntry)
//   } catch (error) {
//     console.log(error)
//     return response.status(400)
//   }
// })
exports.default = personalRouter;
