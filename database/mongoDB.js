const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .catch(error => console.log(error));

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('MongoDB connection started successfully');
})

connection.on('disconnected', () => {
    console.log('MongoDB connection started successfully');
})

connection.on('error', (err) => {
    console.log('MongoDB connection error ', +err);
})