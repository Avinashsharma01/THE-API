import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/BookAPI")
        console.log("Successfully connect to Database");
    } catch (error) {
        console.log(error);
    }
}

export default connectToDB