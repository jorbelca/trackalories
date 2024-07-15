'use strict'
const __createBinding = (this && this.__createBinding) || (Object.create
  ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k
    let desc = Object.getOwnPropertyDescriptor(m, k)
    if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function () { return m[k] } }
    }
    Object.defineProperty(o, k2, desc)
  }
  : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k
    o[k2] = m[k]
  })
const __setModuleDefault = (this && this.__setModuleDefault) || (Object.create
  ? function (o, v) {
    Object.defineProperty(o, 'default', { enumerable: true, value: v })
  }
  : function (o, v) {
    o.default = v
  })
const __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod
  const result = {}
  if (mod != null) for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k)
  __setModuleDefault(result, mod)
  return result
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.SALT_ROUNDS = exports.SECRET = exports.MONGO = exports.PORT = void 0
const dotenv = __importStar(require('dotenv'))
const path_1 = require('path')
dotenv.config({ path: (0, path_1.resolve)(__dirname, '../../.env') })
if (process.env.NODE_ENV === 'test') {
  exports.MONGO = process.env.MONGO_URI_TEST
  exports.PORT = process.env.PORT_TEST
} else {
  exports.MONGO = process.env.MONGO_URI
  exports.PORT = process.env.PORT
}
exports.SECRET = process.env.SECRET
exports.SALT_ROUNDS = Number(process.env.SALT_ROUNDS)
// switch(process.env.NODE_ENV) {
//   case "development":
//     console.log("Environment is 'development'")
//     configDotenv({
//       path: resolve(__dirname, "../.env.development")
//     })
//     break
//   case "test":
//     configDotenv({
//       path: resolve(__dirname, "../.env.test")
//     })
//     break
//   // Add 'staging' and 'production' cases here as well!
//   default:
//     throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`)
// }
