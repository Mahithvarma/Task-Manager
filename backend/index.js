import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "node:fs";


import connectDB from "./src/utils/db.js";
import errorHandler from "./src/helpers/errorhandler.js";
import userRouter from "./src/routes/userRoutes.js";



dotenv.config({});

const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:3000", "https://localhost:3000"],
    credentials: true
}))
app.use(cookieParser());


// app.use(errorHandler);

//Routes
app.use("/api/v1", userRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
