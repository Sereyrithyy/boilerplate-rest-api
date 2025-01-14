const multer = require('multer');
const path = require('path');

// set multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})

// file filter function
const checkFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
}

module.exports = multer({
    storage: storage,
    fileFilter: checkFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    },
})// specify the name of the input field in HTML form