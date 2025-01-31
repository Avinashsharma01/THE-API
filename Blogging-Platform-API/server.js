import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import morgan from "morgan"
import cors from "cors"
import connectToDB from './Database/db.js';
import authRoutes from "./Routes/authRoutes.js"
import postRoutes from "./Routes/postRoutes.js"
import commentRoutes from "./Routes/commentRoutes.js"
import likeRoutes from "./Routes/likeRoutes.js"
const app = express();


const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// Routes 
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use("/api/posts", commentRoutes)
app.use("/api/posts", likeRoutes)

app.get('/', (req, res) => {
    res.send("Blogging API is running...");
})



app.listen(port, () => {
    connectToDB()
    console.log(`Server running on port ${port}`);
});
