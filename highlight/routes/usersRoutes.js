//**  Paquetes requeridos

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')
const multer = require('multer');
const path = require('path');

//cb(null, __dirname + '/../public/images/imagescartel') //aca falta pain.join(__dirname, "../../public...")
const diskStorage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, path.join(__dirname, '/../public/images/imagenesperfil'));// las guardo las imagenes en la carpeta publica por que sino no se puede mostrar
	},
	filename: function(req, file, cb){
	//	let userName = req.body.full_name.replace(/ /g, '_').toLowerCase();
		let imageFinalName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
		cb(null, imageFinalName);
	}
});

const upload = multer({ storage: diskStorage });

// GET -> /users/registrar
router.get('/registro', usersController.register);

// GET -> /users/login
router.get('/ingresar',usersController.login);

// GET -> /users/profile
router.get('/perfil',usersController.showProfile);

// POST -> /users/registrar
router.post('/registro',upload.any(),usersController.store);

// POST -> /users/login
router.post('/ingresar', usersController. processLogin);

// GET -> /users/logout
/**
 * @todo pendiente de implementar en la vista
 */
router.get('/logout',usersController.logout);

/********** EDITAR ***********/

router.get('/edit', upload.any(), usersController.showProfileEdit);
router.put('/edit', upload.any(), usersController.saveEdit);



module.exports = router;