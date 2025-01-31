import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error("Error connecting to the database", error);
    }
}

export default connectToDB