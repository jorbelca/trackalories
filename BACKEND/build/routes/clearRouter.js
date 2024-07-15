'use strict'
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator.throw(value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const mongoose_1 = __importDefault(require('mongoose'))
const config_1 = require('../config/config')
const clearRouter = express_1.default.Router()
clearRouter.post('/', (_request, response) => __awaiter(void 0, void 0, void 0, function * () {
  if (process.env.NODE_ENV === 'test') {
    try {
      const conn = mongoose_1.default.createConnection(`${config_1.MONGO}`)
      const res = yield conn.dropDatabase()
      if (res === true) { return response.status(200).json({ message: 'Cleaned' }) }
    } catch (e) {
      console.log(e)
      return response.status(400)
    }
  }
}))
exports.default = clearRouter
