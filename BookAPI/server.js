import dotenv from "dotenv"
dotenv.config()
import express from "express"
import bookrouter from "./routes/book_routes.js"
import connectToDB from "./database/db.js"
const app = express()
app.use(express.json())


app.get("/", (req, res) => {
    res.json({
        message: 'Hello word'
    })
})

// The router start from 
app.use("/api/book", bookrouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    connectToDB()
    console.log(`Server is running on port no ${port}`);
})
