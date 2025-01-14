require('dotenv').config()
const express = require('express');
const connectToDB = require("./database/db")
const bookRoutes = require('./routes/book-routes')
const authRoutes = require('./routes/auth-routes')
const homeRoutes = require('./routes/home-routes')
const uploadImageRoutes = require('./routes/image-routes')

const app = express();
const PORT = process.env.PORT || 8080

// Connect to our database
connectToDB()

// Middleware
app.use(express.json());

//routes
app.use('/api', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/image', uploadImageRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})