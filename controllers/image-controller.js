const Image = require('../models/image');
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');

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

module.exports = {
    uploadImageController
}