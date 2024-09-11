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

export const app = express();

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

// Función para conectar a MongoDB
async function connectMDB(URI: string | undefined) {
  try {
    await mongoose.connect(URI as string);
    console.log("Connected to MongoDB");

    // Sólo iniciar el servidor si no estamos en entorno de pruebas o si estamos haciendo pruebas E2E
    if (process.env.NODE_ENV !== "test" || process.env.TEST_MODE === "e2e") {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", (error as Error).message);
  }
}

// Conectar a la base de datos solo si no es test o es modo E2E
if (process.env.NODE_ENV !== "test" || process.env.TEST_MODE === "e2e") {
  connectMDB(MONGO);
}

connectMDB(MONGO);
