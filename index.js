import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
//
import userRouter from "./routes/userRoutes.js";
import workRouter from "./routes/workRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
const app = Express();
dotenv.config();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// routes
app.use("/user", userRouter);
app.use("/works", workRouter);
app.use("/team", teamRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

// mongodb
const connectionString = process.env.MONGODB_URI;

mongoose
  .connect("connectionString", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error.message));
