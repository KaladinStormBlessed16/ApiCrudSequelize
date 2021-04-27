const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Product extends Model {}
Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "product"
});

module.exports = Product;