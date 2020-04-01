/**
 * Modulos requeridos
 */
const express = require('express');

const router = express.Router();

const mainController = require('../controllers/mainController');

const mainControllerDetalle = require('../controllers/mainControllerDetalle');


/**
 * Get -> HomePage localhost:3000/
 */
router.get('/', mainController.root);

/**
 * Get -> @todo El Carrito ira en lugar por separado
 */
router.get('/carrito', mainController.root_carrito);

/**
 * Get -> Ruta que entrega el resultado de la busqueda por la barra de busqueda, tanto en la pagina HomePage como en los headers con busqueda
 */
router.get('/resultado',mainController.root_resultado);


/**
 * Get -> Ruta que muestra el detalle de una de las selecciones de carteles de la HomePage o Pagina de resultado en /resultado?busqueda=lugar
 */
router.get('/detalle/:id', mainControllerDetalle.detalle);





module.exports = router;


