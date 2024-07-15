import express from "express"
import { MONGO, PORT } from "./config/config"
import loginRouter from "./routes/loginRoutes"
import registerRouter from "./routes/registerRoutes"
import mealsRouter from "./routes/mealsRoutes"
import weightRouter from "./routes/weightRoutes"
import personalRouter from "./routes/personalRoutes"
import cors from "cors"
import { connect } from "mongoose"

import pingRouter from "./routes/pingRoutes"
import eliminateUserRouter from "./routes/eliminateUserRoutes"
import clearRouter from "./routes/clearRouter"

const corsOptions = {
  origin: ["https://trackalories.vercel.app", "http://localhost:3000"],
  optionsSuccessStatus: 200,
}

const app = express()
// app.options("*", cors (corsOptions:CorsOptions))
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api/ping", pingRouter)
app.use("/api/login", loginRouter)
app.use("/api/register", registerRouter)

app.use("/api/eliminate", eliminateUserRouter)
app.use("/api/meals", mealsRouter)
app.use("/api/personal", personalRouter)
app.use("/api/weight", weightRouter)
app.use("/cleardb_test", clearRouter)

connectMDB().catch((err) => console.log(err))

async function connectMDB() {
  // Connect to MongoDB
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  connect(`${MONGO}`)
  console.log("Connected To MongoDB")
}

app.listen(PORT, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`Server running on port ${PORT}`)
})
