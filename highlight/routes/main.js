// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/* GET - home page. */
router.get('/', mainController.root);
router.get('/carrito', mainController.root_carrito);
router.get('/detalle',mainController.root_detalle);



module.exports = router;


