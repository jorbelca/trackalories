import express from "express";
import { MONGO, PORT } from "./config/config";
import loginRouter from "./routes/loginRoutes";
import registerRouter from "./routes/registerRoutes";
import mealsRouter from "./routes/mealsRoutes";
import weightRouter from "./routes/weightRoutes";
import personalRouter from "./routes/personalRoutes";
import { connect } from "mongoose";
var cors = require("cors");
import pingRouter from "./routes/pingRoutes";
import eliminateUserRouter from "./routes/eliminateUserRoutes";
import clearRouter from "./routes/clearRouter";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
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

connectMDB().catch((err) => console.log(err));

async function connectMDB() {
  // Connect to MongoDB
  connect(`${MONGO}`);
  console.log("Connected To MongoDB");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
