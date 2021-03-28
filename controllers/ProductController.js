const uploader = require('../utils/imageUploader');

const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
   try {
      let query = {};
      if (req.query.name) {
         query['short_name'] = new RegExp(`${req.query.name}`, 'ig')
      }
      let sort = {};
      switch (req.query.sort) {
         case 'priceAsc':
            sort = { price: -1 }
            break;
         case 'priceDesc':
            sort = { price: 1 }
            break;
         case 'newest':
            sort = { releaseDate: -1 }
            break;
         default: sort = {};
      }
      const products = await Product.find(query).sort(sort)
      return res.status(200).json({ products, success: true })
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

exports.getLatestProducts = async (req, res, next) => {
   try {
      const latestProducts = await Product.find().sort({ releaseDate: -1 }).limit(3)
      return res.status(200).json({ latestProducts, success: true })
   } catch (error) {
      next(error)
   }
}


exports.addProduct = [uploader.array('images'), async (req, res, next) => {
   try {
      const { short_name, long_name, description, price, releaseDate, category } = req.body;
      const images = req.files.map(file => file.path)
      console.log(images)

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


      const product = await Product.findOneAndUpdate(
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
      return res.status(200).json({
         product,
         message: "Product has been updated successfully",
         success: true
      })
   } catch (error) {
      next(error)
   }
}


exports.deleteProduct = async (req, res, next) => {
   try {
      const { id } = req.params;

      await Product.deleteOne({ _id: id })
      return res.status(204).json({ message: 'Product has been deleted successfully', success: true })
   } catch (error) {
      next(error)
   }
}


