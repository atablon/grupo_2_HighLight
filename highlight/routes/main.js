// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Esto es muller para levantar la imagen del cartel y guardarla en nuestra carpeta.
// esto es un middleware podemos sacarlo afuera y llamarlo en cada ruta que necesitemos
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/images/imagescartel') //aca falta pain.join(__dirname, "../../public...")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })


// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const mainControllerDetalle = require('../controllers/mainControllerDetalle');


/* GET - home page. */
router.get('/', mainController.root);
router.get('/carrito', mainController.root_carrito);
router.get('/resultado',mainController.root_resultado);
router.get('/ingresar', mainController.ingresar);
router.get('/registrar', mainController.registrar);
router.get('/detalle/:id', mainControllerDetalle.detalle);








/* Get para ser redirigido a la pagina de detalle */
router.get('/detalle/:CartelId',mainControllerDetalle.detalle)


module.exports = router;


