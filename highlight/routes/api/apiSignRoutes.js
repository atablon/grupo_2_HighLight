// ************ Require's ************
const express = require('express');
const router = express.Router();;


// ************ Controller Require ************ /
const signApiController = require('../../controllers/api/signApiController');


// ************ Rutas Require ************ /

router.get('/listAll', signApiController.list);
router.get('/listById/:id', signApiController.find);
router.get('/listByType/:id', signApiController.type);
router.get('/users/count'),
router.get('/lowestCost', signApiController.lowestCost);
router.get('/starItem', signApiController.findFiveStar);








module.exports = router;