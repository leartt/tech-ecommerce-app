const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    short_name: {
        type: String,
        required: [true, 'Product short name is required'],
    },
    long_name: {
        type: String,
        required: [true, 'Product long name is required'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    releaseDate: {
        type: Date,
        required: [true, 'Product release date is required']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        uppercase: true,
    },
    images: {
        type: Array,
        required: [true, 'Product images are required']
    }
}, { timestamps: true })


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;