const express = require('express');
const { getAllBooks, getBookByID, createBook, updateBook, deleteBook } = require('../controllers/book-controller');
const authMiddleware = require('../middleware/auth-middleware');

const router = express.Router();

router.get('/books', authMiddleware, getAllBooks);
router.get('/book/:id', authMiddleware, getBookByID);
router.post('/book', authMiddleware, createBook);
router.put('/update/book/:id', authMiddleware, updateBook);
router.delete('/delete/book/:id', authMiddleware, deleteBook);

module.exports = router;