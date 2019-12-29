// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const mainControllerPublicar = require('../controllers/mainControllerPublicar');
const mainControllerDetalle = require('../controllers/mainControllerDetalle');


/* GET - home page. */
router.get('/', mainController.root);

router.get('/carrito', mainController.root_carrito);
router.get('/resultado',mainController.root_resultado);
router.get('/ingresar', mainController.ingresar);
router.get('/registrar', mainController.registrar);
router.get('/publicar', mainControllerPublicar.publicar);
router.get('/detalle', mainControllerDetalle.detalle);

/* POST - para guardar un producto nuevo. */
router.post('/crear/cartel', mainControllerPublicar.crearcartel);



module.exports = router;


