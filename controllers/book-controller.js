const Book = require("../models/book");

const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find({});
        if (allBooks?.length > 0) {
            res.status(200).json({
                success: true,
                data: allBooks,
                message: "All books retrieved successfully"
            })
        } else {
            res.status(404).json({
                success: false,
                message: "No books found"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error occurred"
        })
    }
}

const getBookByID = async (req, res) => {
    try {
        const getCurrentBook = req.params.id;
        const foundBook = await Book.findById(getCurrentBook);

        if (!foundBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            })
        }
        res.status(200).json({
            success: true,
            data: foundBook,
            message: "Book retrieved successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error occurred"
        })
    }
}

const createBook = async (req, res) => {
    try {
        const newBook = req.body;
        const savedBook = await book.create(newBook);
        if (savedBook) {
            res.status(200).json({
                success: true,
                data: savedBook,
                message: "Book created successfully"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error occurred"
        })
    }
}

const updateBook = async (req, res) => {
    try {
        const getCurrentBook = req.params.id;
        const updatedBook = req.body;
        const updatedBookData = await Book.findByIdAndUpdate(getCurrentBook, updatedBook, { new: true });

        if (!updatedBookData) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            })
        }
        res.status(200).json({
            success: true,
            data: updatedBookData,
            message: "Book updated successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error occurred"
        })
    }
}

const deleteBook = async (req, res) => {
    try {
        const getCurrentBook = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(getCurrentBook);

        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error occurred"
        })
    }
}

module.exports = {
    getAllBooks,
    getBookByID,
    createBook,
    updateBook,
    deleteBook
}