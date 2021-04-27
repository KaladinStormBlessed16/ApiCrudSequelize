const Container = require('../database/models/Container');
const Manager = require('../database/models/Manager');
var containerController = {

    listContainers: async(req, res) => {
        try {
            const response = await Container.findAll();
            if (!response)
                return res.status(404).json('Containers not found');
            return res.json(response);
        } catch (e) {
            console.log('Error: ' + e);
        }
        return res.status(404).json('Container not found');
    },

    getContainer: async(req, res) => {
        try {
            let id = req.params.id;
            const response = await Container.findOne({ where: { id: id } });
            if (!response)
                return res.status(404).json('Container not found');
            return res.json(response);
        } catch (e) {
            console.log('Error: ' + e);
        }
    },

    saveContainer: async(req, res) => {
        try {
            const manager = await Manager.findOne({ where: { id: req.body.managerId } });
            if (!req.body.managerId || !manager) {
                res.status(400).json('Manager ID cannot be null or may not exist');
                return;
            }
            const response = await Container.create({
                id: req.body.id,
                address: req.body.address,
                width: req.body.width,
                height: req.body.height,
                managerId: req.body.managerId
            });
            return res.status(201).json('Container Created');
        } catch (e) {
            console.log('Error: ' + e);
        }
        return res.status(400).json('Container Not Created');
    },

    updateContainer: async(req, res) => {
        try {
            let id = req.params.id;
            let newData = req.body;
            const container = await Container.findOne({ where: { id: id } });
            if (!container)
                return res.status(404).json('Container not found');
            const updatedContainer = await container.update(newData);
            return res.json(updatedContainer);
        } catch (e) {
            console.log('Error: ' + e);
        }
        return res.status(400).json('Container Not Updated');
    },

    deleteContainer: async(req, res) => {
        try {
            let id = req.params.id;
            const response = await Container.destroy({ where: { id: id } });
            if (!response)
                return res.status(404).json('Container not found');
            return res.json('Container Deleted');
        } catch (e) {
            console.log('Error: ' + e);
        }
        return res.status(400).json('Container Not Deleted');
    }
};

module.exports = containerController;