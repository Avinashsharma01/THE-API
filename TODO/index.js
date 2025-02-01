import express from "express"
import ConnectToDb from "./Database/db.js"
import cors from "cors"
import todo_toute from "./Routes/todo_route.js"

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello Chicha")
})

app.use('/api/todos', todo_toute)

app.listen(port, () => {
    ConnectToDb()
    console.log(`Server is listing on port no ${port} `);
})

