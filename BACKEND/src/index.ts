import { loadEnv } from "./config/loadEnv";
// Cargar variables de entorno
loadEnv();
import express from "express";
import { MONGO, PORT } from "./config/config";
import loginRouter from "./routes/loginRoutes";
import registerRouter from "./routes/registerRoutes";
import mealsRouter from "./routes/mealsRoutes";
import weightRouter from "./routes/weightRoutes";
import personalRouter from "./routes/personalRoutes";
import mongoose, { Error } from "mongoose";
var cors = require("cors");
import pingRouter from "./routes/pingRoutes";
import eliminateUserRouter from "./routes/eliminateUserRoutes";
import clearRouter from "./routes/clearRouter";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://trackalories.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Access-Control-Allow-Origin",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/ping", pingRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/weight", weightRouter);
app.use("/api/eliminate", eliminateUserRouter);
app.use("/api/meals", mealsRouter);
app.use("/api/personal", personalRouter);
app.use("/cleardb_test", clearRouter);

async function connectMDB(URI: string | undefined) {
  // Connect to MongoDB
  mongoose
    .connect(URI as string)
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error: Error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
}

connectMDB(MONGO);
