import Books from "../models/book_model.js"

const getAllBooks = async (req, res) => {
    try {
        const AllBook = await Books.find({})
        if (AllBook?.length > 0) {
            res.status(200).json({
                Books: AllBook
            })
        } else {
            res.json({
                message: "books not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
const getSingleBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const getsinglebook = await Books.findById(id)
        res.json({
            book: getsinglebook
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
const addNewBook = async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const newBook = await Books.create({
            title,
            author,
            year
        })
        res.status(200).json(newBook)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params
        const { title, author, year } = req.body
        const updatedBook = await Books.findOneAndUpdate({ _id: id }, {
            title,
            author,
            year
        }, { new: true })

        if (!updatedBook) {
            res.json({
                message: "books not found"
            })
        }

        res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.body
        const deletebook = await Books.findOneAndDelete(id)
        if (deleteBook) {
            res.json({
                message: "Books deleted successfully",
                data: deletebook
            })
        } else {
            res.json({
                message: "Books not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export {
    getAllBooks,
    getSingleBookById,
    addNewBook,
    updateBook,
    deleteBook
}