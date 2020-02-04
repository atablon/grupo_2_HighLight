//**  Paquetes requeridos

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt');




// Constants
const userFilePath = path.join(__dirname, '../data/users.json');

function getAllUsers() {
	let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
	let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent);
	return finalUsers;
}
function getUserByEmail(email) {
	let allUsers = getAllUsers();
	let userByEmail = allUsers.find(oneUser => oneUser.email == email);
	return userByEmail;
}

function getUserById(id) {
	let allUsers = getAllUsers();
	let userById = allUsers.find(oneUser => oneUser.id == id);
	return userById;
}

function storeUser(newUserData) {
	// Traer a todos los usuarios
	let allUsers = getAllUsers();
	// Generar el ID y asignarlo al nuevo usuario
	newUserData = {
		id: generateUserId(),
		...newUserData
	};
	// Insertar el nuevo usuario en el array de TODOS los usuarios
	allUsers.push(newUserData);
	// Volver a reescribir el users.json
	fs.writeFileSync(userFilePath, JSON.stringify(allUsers, null, ' '));
	// Finalmente, retornar la información del usuario nuevo
	return newUserData;
}

function generateUserId() { //devuelve el Id del ultimo usuario
	let allUsers = getAllUsers();
	if (allUsers.length == 0) {
		return 1;
	}
	let lastUser = allUsers.pop();
	return lastUser.id + 1;
}

function getUserFormData(req){ // recupero los datos del formulario y los devuelvo en un objeto

    console.log(req.body);
    
    if(req.body.pass == req.body.rpass){
        // Hash del password
        req.body.pass = bcrypt.hashSync(req.body.pass, 10);

        let newUser = {
            nombre: req.body.nombre,
            tipoUsuario: req.body.tipoUsuario,
            empresa: req.body.empresa,
            rubro: req.body.rubro,
            tel: req.body.tel,
            email: req.body.email,
            fotoPerfil: req.files[0].filename,
            pass: req.body.pass, // ya se encuentra hasheado 
        }
        return newUser;
    }
    else{
        return -1;
    }

}

const usersController = {

    register: (req,res)=>{
        res.render('registro');
    },
    login: (req,res) => {
        res.render('ingresar');
    },
    store: (req,res,next) =>{
        // Aca tengo que guardar en la base de datos el usuario nuevo, con un nuevo id y hasheando la contrasena que envie
        // tambien tengo que validar que exista o no el usuario

        let newUser = getUserFormData(req); // recupero los datos del formulario en la ruta: POST ->/registro
        // agregar validacion al session para ver si hubo un problema y tengo que mostrar algo en pantalla
        delete req.body.rpass;
        delete req.body.pass;
        
		// Guardar al usario y como la función retorna la data del usuario lo almacenamos en ela variable "user"
		newUser = storeUser(newUser);

        console.log('\n USUARIO CREADO: \n');
        
        console.log(newUser);
		// Setear en session el ID del usuario nuevo para auto loguearlo
        
        req.session.userId = newUser.id;
        
		// Setear la cookie para mantener al usuario logueado PENDIENTE DE PROGRAMAR
		res.cookie('userCookie', newUser.id, { maxAge: 60000 * 60 });
        
        return res.redirect('/users/ingresar');
        
    },
    processLogin: (req,res) =>{
        // Aca tengo que procesar si el login fue hecho correctamente teniendo en cuenta el hasheo el uso de sesion, etc.. 
        // tengo que validad que exista o no el usuario
        
        let user = getUserByEmail(req.body.email);		

		// Si encontramos al usuario
		if (user != undefined) {
			// Al ya tener al usuario, comparamos las contraseñas
			if (bcrypt.compareSync(req.body.pass, user.pass)) {
				// Setear en session el ID del usuario
				req.session.userId = user.id;

				// Setear la cookie
				if (req.body.remember_user) {
					res.cookie('userCookie', user.id, { maxAge: 60000 * 60 });
				}

				// Redireccionamos al visitante a la home, editar el html
				return res.send('INGRESO CORRECTAMENTE ' + user.nombre );
			} else {
				res.send('Credenciales inválidas');
			}
		} else {
			res.send('No hay usuarios registrados con ese email');
		}

    },

}

module.exports = usersController;