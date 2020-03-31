// ************ Require's ************
const express = require('express');
const router = express.Router();;


// ************ Controller Require ************ /
const signApiController = require('../../controllers/api/signApiController');


// ************ Rutas Require ************ /
router.get('/', signApiController.list);
router.get('/:id', signApiController.find);
router.get('/type_id/:id', signApiController.type);





module.exports = router;