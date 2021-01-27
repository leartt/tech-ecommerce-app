const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

// app initialization
const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


// DB Connection
require('./database/mongoDB');


// API endpoints
app.use('/api/users', require('./routes/api/users'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/orders', require('./routes/api/orders'));


// Error handler middleware
app.use((err, req, res, next) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    return res.status(err.statusCode).json({ message: err.message, stack: err.stack })
})

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
