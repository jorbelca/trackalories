import * as dotenv from 'dotenv'
import { Secret } from 'jsonwebtoken'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../../.env') })

export let PORT: Number | string | undefined
export let MONGO: String | undefined
if (process.env.NODE_ENV === 'test') {
  MONGO = process.env.MONGO_URI_TEST
  PORT = process.env.PORT_TEST
} else {
  MONGO = process.env.MONGO_URI
  PORT = process.env.PORT
}
export const SECRET: String | Secret | any = process.env.SECRET
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS)

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
