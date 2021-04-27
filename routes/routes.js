var express = require('express')
var ManagerController = require('../controllers/managerController');
var ContainerController = require('../controllers/containerController');
var ProductController = require('../controllers/productController');

var router = express.Router();

// MANAGER ROUTES
router.get('/managers', ManagerController.listManagers);
router.get('/managers/:id', ManagerController.getManager);
router.post('/managers/new', ManagerController.saveManager);
router.put('/managers/:id', ManagerController.updateManager);
router.delete('/managers/:id', ManagerController.deleteManager);
router.get('/manager-complete/:id', ManagerController.getManagerComplete);

// CONTAINER ROUTES
router.get('/containers', ContainerController.listContainers);
router.get('/containers/:id', ContainerController.getContainer);
router.post('/containers/new', ContainerController.saveContainer);
router.put('/containers/:id', ContainerController.updateContainer);
router.delete('/containers/:id', ContainerController.deleteContainer);

// PRODUCT ROUTES
router.get('/products', ProductController.listProducts);
router.get('/products/:id', ProductController.getProduct);
router.post('/products/new', ProductController.saveProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;