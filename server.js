require('dotenv').config()
const express = require('express');
const connectToDB = require("./database/db")
const bookRoutes = require('./routes/book-routes')

const app = express();
const PORT = process.env.PORT || 8080

// Connect to our database
connectToDB()

// Middleware
app.use(express.json()); 

//routes
app.use('/api', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})