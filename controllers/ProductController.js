const uploader = require('../utils/imageUploader');

const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        return res.status(200).json({products, success: true})
    } catch (error) {
        next(error)
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ _id: id });
        
        return res.status(200).json({ product, success: true })
    } catch (error) {
        next(error)
    }
}

exports.addProduct = [uploader.array('images'), async (req, res, next) => {
    try {
        const { short_name, long_name, description, price, releaseDate, category } = req.body;
        const images = req.files.map(file => file.path)

        const product = new Product({
            short_name,
            long_name,
            description,
            price,
            releaseDate,
            category,
            images,
        })

        await product.save();
        return res.status(200).json({ message: 'Product has been added successfully', success: true });

    } catch (error) {
        next(error)
    }
}]

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { short_name, long_name, description, price, releaseDate, category } = req.body;


        const products = await Product.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    short_name,
                    long_name,
                    description,
                    price,
                    releaseDate,
                    category
                }
            },
            { new: true }
        )
        return res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}


exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Product.deleteOne({ _id: id })
        return res.status(200).json({ message: 'Product has been deleted successfully', success: true })
    } catch (error) {
        next(error)
    }
}


