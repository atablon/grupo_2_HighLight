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


/************ Controllers Required ************/

const mainController = require('../controllers/mainController');
const mainControllerPublicar = require('../controllers/mainControllerPublicar');
const mainControllerDetalle = require('../controllers/mainControllerDetalle');

/* para el nuevo publicar por pasos */
const mainControllerPublicarPasos = require('../controllers/mainControllerProducts');
const usersConstroller = require('../controllers/usersController');


/* GET - home page. */
router.get('/', mainController.root);
router.get('/carrito', mainController.root_carrito);
router.get('/resultado',mainController.root_resultado);
router.get('/ingresar', mainController.ingresar);
router.get('/detalle', mainControllerDetalle.detalle);

router.get('/products/create', mainControllerPublicar.crear);






/* Get para ser redirigido a la pagina de detalle */
router.get('/detalle/:CartelId',mainControllerDetalle.detalle)

/* POST - para guardar un producto nuevo. */ 
router.post('/products/create',upload.any(), mainControllerPublicar.crearcartel);/* si es una sola imagen poner .single(nombrename del input. )

/* DELETE - Borrar un Producto en DB */
router.delete('/productos/borrar/:id', mainControllerPublicar.borrarCartel);


/* Editar un producto */
// en la ruta agregamos upload.any para llamar a middleware de imag. 
router.get('/productos/editar/:id', mainControllerPublicar.seleccionarCartel);
router.put('/editar/cartel/:id', upload.any(),mainControllerPublicar.modificar);


module.exports = router;


