const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true,
        maxLength: [100, 'Book title can not be more than 100 characters']
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
    },
    year: {
        type: Number,
        required: [true, 'Publication year is required'],
        min: [1000, 'Publication year should be a valid year'],
        max: [new Date().getFullYear(), 'Publication year should be a valid year']
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Book', bookSchema);