const Manager = require('./models/Manager')
const Container = require('./models/Container')
const Product = require('./models/Product')

Manager.hasOne(Container);
Container.belongsTo(Manager, {
    foreignKey: { allowNull: false, unique: true }
});
Container.hasMany(Product);
Product.belongsTo(Container, {
    foreignKey: { allowNull: false }
});