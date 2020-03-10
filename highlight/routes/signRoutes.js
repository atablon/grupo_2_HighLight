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
const signController = require('../controllers/signController');


/********** Nuevo PUBLICAR ***********/
router.get('/index', signController.index);

/********** VISTA PUBLICAR ***********/
router.get('/publish', signController.publish);

/**********  Guardar PUBLICAR ***********/
router.post('/sign_list', upload.any(), signController.sign_list);


/********** EDITAR ***********/
router.get('/edit/:id', upload.any(), signController.edit);
// router.put('/edit/:id', upload.any(), signController.editSave);


/********** ELIMINAR ***********/
router.delete('/delete/:id', signController.delete);


module.exports = router;