const express = require('express');
const router = express.Router();;

const userApiController = require('../../controllers/api/userApiController');

/**
 * Obtener listado de usuarios
 */
router.get('/',userApiController.usersList);

/**
 * Obtener detalles de un usuario en particular
 */
router.get('/:id',userApiController.userDetail);


/**
 * Obtener cantidad de usuarios por tipo
 */

module.exports = router;