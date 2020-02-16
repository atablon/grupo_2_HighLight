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
const mainControllerProducts = require('../controllers/mainControllerProducts');


/**********  Nuevo PUBLICAR ***********/  
router.get('/publicar', mainControllerProducts.publicar);

/*POST Para guardar información del PASO UNO de publicar */
router.post('/publicar_ubicacion', upload.any(), mainControllerProducts.publicarProducto);


/**********  Nuevo LISTADO ***********/
router.get('/listado', mainControllerProducts.listado);

/********** EDITAR ***********/
router.get('/editar/:id', upload.any(), mainControllerProducts.edicion);
router.put('/editar/:id', upload.any(), mainControllerProducts.guardarEdicion);


/********** ELIMINAR ***********/
router.delete('/borrar/:id', mainControllerProducts.eliminar);



module.exports = router;


