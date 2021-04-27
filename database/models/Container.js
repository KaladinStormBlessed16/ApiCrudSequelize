const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Container extends Model {}
Container.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                args: true,
                msg: "El Teléfono tiene que ser un numero"
            }
        }
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                args: true,
                msg: "El Teléfono tiene que ser un numero"
            }
        }
    }
}, {
    sequelize,
    modelName: "container"
});

module.exports = Container;