const Image = require('../models/image');
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');
const paginate = require('../helpers/paginateHelper');

const uploadImageController = async (req, res) => {
    try {
        // check if file is missing in request object
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            })
        }

        // upload the file to cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path);

        //store the image url and public id
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })

        await newlyUploadedImage.save();

        // delete the file from local storage
        fs.unlinkSync(req.file.path);

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newlyUploadedImage
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}

const getImagesController = async (req, res) => {
    try {
        const page = req.query.page;
        const size = req.query.size;
        const sort = req.query.sort || 'createdAt'; // Default sort by createdAt
        const order = req.query.order === 'desc' ? -1 : 1; // Default order is ascending

        // Call the paginate function
        const { data, paging } = await paginate(Image, page, size, {}, { [sort]: order });

        res.status(200).json({
            success: true,
            message: 'OK',
            data,
            paging,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};


const deleteImageController = async (req, res) => {
    try {
        const getImagesId = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getImagesId);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            })
        }

        if (image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this image'
            })
        }

        await cloudinary.uploader.destroy(image.publicId);

        await Image.findByIdAndUpdate(getImagesId);

        res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
        })

    } catch {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}

module.exports = {
    uploadImageController,
    getImagesController,
    deleteImageController
}