// ************ Require's ************
const express = require('express');
const router = express.Router();;


// ************ Controller Require ************ /
const signApiController = require('../../controllers/api/signApiController');


/**
 * RUTAS de la coleccion SIGNS
 */

/**
 * Get -> Devuelve los carteles con un costo menor al solicitado por el Query string  '/api/signs/lowestCost?cost=x'
 */
router.get('/lowestCost', signApiController.lowestCost );

router.get('/listAll', signApiController.list);

router.get('/listById/:id', signApiController.find);

router.get('/listByType/:id', signApiController.type);
router.get('/users/count'),
router.get('/lowestCost', signApiController.lowestCost);
router.get('/starItem', signApiController.findFiveStar);








module.exports = router;