import express from "express";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import todoRoute from "./routes/todoRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// mongodb connection

mongoose.connect("mongodb+srv://iap:1234@cluster0.mvc5jam.mongodb.net/Cluster0")
.then(()=> console.log("DB connected"))
.catch(err => console.log(err));


// routes
app.use("/", authRoute);
app.use("/users", userRoutes);
app.use("/todos",todoRoute)

// serve frontend
app.use(express.static("frontend"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});