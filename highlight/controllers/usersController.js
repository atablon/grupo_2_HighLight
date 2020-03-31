//**  Paquetes requeridos

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt');
const db = require("../src/database/models")

// Constants
const userFilePath = path.join(__dirname, '../data/users.json');

/**
 * Funcion que se encarga de validar los datos encontrados en la base de datos
 */
function validateUserEntry(req,res,user){
	
		// Si encontramos al usuario
		if (user != undefined) {
			// Al ya tener al usuario, comparamos las contraseñas
			if (bcrypt.compareSync(req.body.user_password, user.user_password)) {
				delete user.user_password;
				// Setear en session el ID del usuario
				req.session.user = user;

				// Setear la cookie
				if (req.body.remember_user) {
					res.cookie('userCookie', user.id, { maxAge: 60000 * 60 });
				}

				/**
				 * @todo Redireccionamos al visitante a la home, editar el html
				 */

				return res.redirect('/users/perfil');
				
			} else {
				// para ver con beto>
				return res.redirect('/users/ingresar');
				
			}
		} else {

			/**
			 * @todo hacer la pagina de usuario no existente, en otras palabras que la misma pagina en la que esta le avise que no se encontro el usuario
			 * con ese email y contrasenia
			 */
			res.send('No hay usuarios registrados con ese email');
		}
}

/** Se recuperan los datos del formulario y se los devuelve en un nuevo objeto
 * 	con la informacion validada.
 */
function getUserFormData(req){

    if(req.body.pass == req.body.rpass){
		// Hash del password
		let userAdditionalData = {
			user_password: bcrypt.hashSync(req.body.pass, 10),
			profile_picture: req.files[0].filename
		};
		
		/**@todo hacer la validacion campo por campo, armar un arreglo que vaya conteniendo todos los posibles errores
		 * y que cuando termine tome la decision de informar el problema.
		 */
		delete req.body.rpass;
		delete req.body.pass; // como el password esta validado, elimino la variable y solo dejo el hash en user_password
		delete req.files;

		let newUser = {...req.body,...userAdditionalData};
		console.log(newUser);
	
        return newUser;
    }
    else{
        return -1;
    }

}

/**
 * Controladores de las distintas rutas pertenecientes a la entidad de usuario y su procesamiento
 */
const usersController = {
	/**
	 * Se hace el render de la vista de registracion
	 */
    register: (req,res)=>{
        res.render('user/userRegister');
	},
	/**
	 * Se hace el render de la vista de Login
	 */
    login: (req,res) => {
        res.render('user/ingresar');
	},
	/**
	 * Se guarda la informacion del usuario en la base de datos y luego se redirije a la vista de login
	 */
    store: (req,res,next) =>{
        // Aca tengo que guardar en la base de datos el usuario nuevo, con un nuevo id y hasheando la contrasena que envie
        // tambien tengo que validar que exista o no el usuario

        let newUserData = getUserFormData(req); // recupero los datos del formulario en la ruta: POST ->/registro

		db.User.create(newUserData)
			.then( (userCreated)=>{
			
				req.session.userId = userCreated.id;
			
				res.cookie('userCookie', userCreated.id, { maxAge: 60000 * 60 });

				return res.redirect('/users/ingresar');
			})
			.catch(error => console.log(error));
	
        
	},
	/**
	 * Se procesa el ingreso del usuario, se administran los cookies y variables de session y se redirije a la vista del perfil de usuario
	 */
    processLogin: (req,res) =>{
		db.User.findOne({
			where:{
				email:req.body.email
			}
		})
		.then(userByEmail=>{			
			validateUserEntry(req,res,userByEmail);
		})
		.catch(error=>console.log(error));
	
	},
	/**	
	 * Se muestra el perfil del usuario cuya session este activa o recien haya ingresado
	 */
	showProfile: (req,res)=>{
		return (res.render('user/perfil')); 	
	},
	/**
	 * Funcion para hacer logout, @todo incorporar en la vista del perfil
	 */
	logout: (req, res) => {
        req.session.destroy();
		res.cookie('userCookie', null, { maxAge: -1 });
        return(res.redirect('/'));
	},
	/**
	 * Funcion que se encarga de actualizar el valor de contrasena modificado en el formulario, a su vez se hace validacion de back
	 * verificando que las dos contrasenas ingresadas sean la misma. De no ser las mismas envia un mensaje de aviso.
	 */
	saveEdit: (req,res) => {
	
		if(req.body.pass == req.body.rpass){//validacion de back

			db.User.update(
				{user_password: bcrypt.hashSync(req.body.pass, 10)},
				{ where: {id: req.session.user.id} }
			)
			.then(results => {
				return (res.redirect("/users/perfil"));
			});

		} else {
			let passError = true;
			res.render("user/editUser", {passError:passError});
		}

	},
/**
 * Controlador que se encarga de renderizar la vista para editar la contrasena de usuario
 */
	showProfileEdit: (req, res) => {
		res.render('user/editUser');
	},

}

module.exports = usersController;