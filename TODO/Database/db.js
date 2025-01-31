import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const ConnectToDb = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Successfully connected to the database");
        })
        .catch((error) => {
            console.error("Error connecting to the database", error);
            process.exit(1);
        });
}

export default ConnectToDb;