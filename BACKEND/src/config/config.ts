import * as dotenv from 'dotenv';
import { resolve } from 'path'


dotenv.config({ path: resolve(__dirname, "../../.env") })


export const PORT = process.env.PORT;



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