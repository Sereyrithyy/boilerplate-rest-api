const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const uploadMiddleware = require('../middleware/upload-middleware');
const { uploadImageController, getImagesController, deleteImageController } = require('../controllers/image-controller');

const router = express.Router();

router.post('/upload', authMiddleware, uploadMiddleware.single('image'), uploadImageController)

router.get('/all', authMiddleware, getImagesController)

router.delete('/:id', authMiddleware, deleteImageController)

module.exports = router