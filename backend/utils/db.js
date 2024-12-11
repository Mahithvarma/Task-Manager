import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({});

const mongo_uri = process.env.MONGO_URI || "";

const connectDB = async () => {
    await mongoose.connect(mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("DB Connected Successfully..!");
    }).catch((error) => {
        console.error("DB Connection Failed", error);
    });
};

export default connectDB;