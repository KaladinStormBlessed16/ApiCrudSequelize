const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Manager extends Model {}
Manager.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo no puede ser nulo"
            }
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo no puede ser nulo"
            }
        },
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: {
                args: true,
                msg: "El campo tiene que ser un correo valido"
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        validate: {
            isInt: {
                args: true,
                msg: "El Teléfono tiene que ser un numero"
            }
        }
    }
}, {
    sequelize,
    modelName: "manager"
});

module.exports = Manager;