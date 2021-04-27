const Product = require('../database/models/Product');
const Container = require('../database/models/Container');
var productController = {

    listProducts: async(req, res) => {
        try {
            const response = await Product.findAll();
            return res.json(response);
        } catch (e) {
            console.log('Error: ' + e);
        }
        return res.status(404).json('Product not found');
    },

    getProduct: async(req, res) => {
        try {
            let id = req.params.id;
            const response = await Product.findOne({ where: { id: id } });
            if (!response)
                return res.status(404).json('Product not found');
            return res.json(response);
        } catch (e) {
            console.log('Error: ' + e);
        }
        return res.status(404).json('Product not found');
    },

    saveProduct: async(req, res) => {
        try {
            console.log(req.body.containerId);
            const container = await Container.findOne({ where: { id: req.body.containerId } });
            if (!req.body.containerId || !container) {
                res.status(400).json('Container ID cannot be null or may not exist');
                return;
            }
            const response = await Product.create({
                id: req.body.id,
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                containerId: req.body.containerId
            });
            return res.status(201).json('Product Created');
        } catch (e) {
            console.log('Error: ' + e);
        }
        return res.status(400).json('Product Not Created');
    },

    updateProduct: async(req, res) => {
        try {
            let id = req.params.id;
            let newData = req.body;
            const product = await Product.findOne({ where: { id: id } });
            if (!product)
                return res.status(404).json('Product not found');
            const updatedProduct = await product.update(newData);
            return res.json(updatedProduct);
        } catch (e) {
            console.log('Error: ' + e);
        }
        return res.status(400).json('Product Not Updated');
    },

    deleteProduct: async(req, res) => {
        try {
            let id = req.params.id;
            const response = await Product.destroy({ where: { id: id } });
            if (!response)
                return res.status(404).json('Product not found');
            return res.json('Product Deleted');
        } catch (e) {
            console.log('Error: ' + e);
        }
        return res.status(400).json('Product Not Updated');
    }
};

module.exports = productController;