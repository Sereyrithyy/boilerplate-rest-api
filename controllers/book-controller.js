const paginate = require("../helpers/paginateHelper");
const Book = require("../models/book");

const getAllBooks = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const size = req.query.size || 10;
        const sort = req.query.sort || 'title';
        const order = req.query.order === 'desc' ? -1 : 1;

        // Call the paginate function
        const { data, paging } = await paginate(Book, page, size, {}, { [sort]: order });

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data,
            paging,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error occurred",
        });
    }
};


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
        const { title, author, year, tags } = req.body;

        // Validation for tags (optional, as the schema also validates this)
        if (!tags || !Array.isArray(tags) || tags.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one tag is required"
            });
        }

        if (tags.length > 5) {
            return res.status(400).json({
                success: false,
                message: "Number of tags should not exceed 5"
            });
        }

        const newBook = { title, author, year, tags };
        const savedBook = await Book.create(newBook);

        res.status(201).json({
            success: true,
            data: savedBook,
            message: "Book created successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error occurred"
        });
    }
};


const updateBook = async (req, res) => {
    try {
        const getCurrentBook = req.params.id;
        const { tags } = req.body;

        // Validate tags if they are included in the update payload
        if (tags) {
            if (!Array.isArray(tags) || tags.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Tags must be an array with at least one item"
                });
            }

            if (tags.length > 5) {
                return res.status(400).json({
                    success: false,
                    message: "Number of tags should not exceed 5"
                });
            }
        }

        const updatedBook = req.body;
        const updatedBookData = await Book.findByIdAndUpdate(getCurrentBook, updatedBook, { new: true });

        if (!updatedBookData) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedBookData,
            message: "Book updated successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error occurred"
        });
    }
};


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