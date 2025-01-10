const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sereyrithyvandy:sereyrithyvandy2025@cluster0.8iulr.mongodb.net/')
        console.log('connection successful')
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectToDB;