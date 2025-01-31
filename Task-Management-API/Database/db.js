import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        const mongoUrl = 'mongodb+srv://avinashsharma31384:avinashsharma31384@avinash.3qwizgn.mongodb.net/TaskManagementAPI?retryWrites=true&w=majority&appName=Avinash';
        console.log(`Connecting to MongoDB at ${mongoUrl}`);
        await mongoose.connect(mongoUrl);
        console.log("Connection Successfully to database");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectToDB;