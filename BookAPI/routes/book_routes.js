import express from "express"

import { getAllBooks, getSingleBookById, addNewBook, updateBook, deleteBook } from "../controller/book_controller.js"

const router = express.Router()

router.get("/get", getAllBooks);
router.get("/get/:id", getSingleBookById);
router.post("/add", addNewBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

export default router