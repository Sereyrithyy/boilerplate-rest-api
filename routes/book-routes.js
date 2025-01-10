const express = require('express');
const { getAllBooks, getBookByID, createBook, updateBook, deleteBook } = require('../controllers/book-controller');

const router = express.Router();

router.get('/books', getAllBooks);
router.get('/book/:id', getBookByID);
router.post('/book', createBook);
router.put('/update/book/:id', updateBook);
router.delete('/delete/book/:id', deleteBook);

module.exports = router;