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
router.get('/detalle', mainControllerDetalle.detalle);
router.get('/listado', mainControllerPublicar.listado);
router.get('/products/create', mainControllerPublicar.crear);


/* POST - para guardar un producto nuevo. */
router.post('/products/create', mainControllerPublicar.crearcartel);

/* DELETE - Borrar un Producto en DB */
router.delete('/productos/borrar/:id', mainControllerPublicar.borrarCartel);


/* Editar un producto */
router.put('/productos/editar/:id', mainControllerPublicar.seleccionarCartel);
router.put('/editar/cartel/:id', mainControllerPublicar.modificar);


module.exports = router;


