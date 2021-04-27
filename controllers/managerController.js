const Manager = require('../database/models/Manager');
const Container = require('../database/models/Container');
const Product = require('../database/models/Product');

var managerController = {

    listManagers: async(req, res) => {
        try {
            const response = await Manager.findAll();
            if (!response)
                return res.status(404).json('Managers not found');
            return res.json(response);
        } catch (e) {
            console.log('Error: ' + e);
        }
    },

    getManager: async(req, res) => {
        try {
            let id = req.params.id;
            const response = await Manager.findOne({ where: { id: id } });
            if (!response)
                return res.status(404).json('Manager not found');
            return res.json(response);
        } catch (e) {
            console.log('Error: ' + e);
        }
    },

    saveManager: async(req, res) => {
        try {
            await Manager.create({
                id: req.body.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone
            });
            return res.status(201).json('Manager Created');
        } catch (e) {
            console.log('Error: ' + e);
            return res.status(400).json('Manager Not Created');
        }
    },

    updateManager: async(req, res) => {
        try {
            let id = req.params.id;
            let newData = req.body;
            const manager = await Manager.findOne({ where: { id: id } });
            if (!manager)
                return res.status(404).json('Manager not found');
            const updatedManager = await manager.update(newData);
            return res.json(updatedManager);
        } catch (e) {
            console.log('Error: ' + e);
        }
    },

    deleteManager: async(req, res) => {
        try {
            let id = req.params.id;
            const response = await Manager.destroy({ where: { id: id } });
            if (!response)
                return res.status(404).json('Manager not found');
            return res.json('Manager Deleted');
        } catch (e) {
            console.log('Error: ' + e);
        }
        return res.status(400).json('Manager Not Deleted');
    },

    getManagerComplete: async(req, res) => {
        try {
            let data = {};
            let id = req.params.id;
            const manager = await Manager.findOne({ where: { id: id } });
            if (!manager)
                return res.status(404).json('Manager not found');

            data.Manager = {...manager.dataValues };

            const container = await Container.findOne({ where: { managerId: manager.id } });
            if (!container) {
                return res.send(data);
            }
            data.Manager.Container = {...container.dataValues };

            const products = await Product.findAll({ where: { containerId: container.id } });
            if (!products) {
                return res.send(data);
            }
            data.Manager.Container.Products = {...products };
            return res.json(data);
        } catch (e) {
            console.log('Error: ' + e);
        }
        return res.status(400).json('Error in manager-complete');
    }
};

module.exports = managerController;