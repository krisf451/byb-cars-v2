import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./routes/auth.js";
import carsRouter from "./routes/cars.js";
import stripeRouter from "./routes/stripe.js";

dotenv.config();
console.log('test')


const PORT = process.env.PORT || 9000;
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cars", carsRouter);
app.use("/api/v1/payment", stripeRouter);

app.get("/", (req, res) => {
  res.json({ message: "sanity check" });
});

app.use("/uploads", express.static("uploads"));
app.use(errorHandler);

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
