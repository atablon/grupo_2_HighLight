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
const productsController = require('../controllers/productsController');


/**********  Nuevo PUBLICAR ***********/  
router.get('/publicar', productsController.publicar);

/*POST Para guardar información del PASO UNO de publicar */
router.post('/publicar_ubicacion', upload.any(), productsController.publicarProducto);


/**********  Nuevo LISTADO ***********/
router.get('/listado', productsController.listado);

/********** EDITAR ***********/
router.get('/editar/:id', upload.any(), productsController.edicion);
router.put('/editar/:id', upload.any(), productsController.guardarEdicion);


/********** ELIMINAR ***********/
router.delete('/borrar/:id', productsController.eliminar);



module.exports = router;


