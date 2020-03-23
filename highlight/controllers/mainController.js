const fs = require('fs');
const path = require('path');
const db = require('../src/database/models');

// Constants
const userFilePath = path.join(__dirname, '../data/users.json');

// Helper Functions
function getAllUsers() {
	let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
	let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent);
	return finalUsers;
	/**@todo eliminar funcion, ahora con manejo de base de datos son inutiles */
}

function getUserById(id) {
	let allUsers = getAllUsers();
	let userById = allUsers.find(oneUser => oneUser.id == id);
	return userById;

	/**@todo eliminar funcion, ahora con manejo de base de datos son inutiles */
}

const controller = {
	root: (req, res) => {
		/**
		 * @todo limpiar todas estas lecturas y hacer una buena busqueda de la informacion para la pantalla principal en la base de datos 
		 * */
		// Acceso a la base de datos (Actualmente en JSON)
		let filePath = path.join(__dirname, '../data/productos_creados.json');
		let cartelesDb = JSON.parse(fs.readFileSync(filePath,{encoding:'utf-8'}));

		res.render('index',{cartelesDb});
	
	},
	root_carrito: (req, res) => {
		res.render('carrito');
	},
	root_resultado: (req, res) => {
		
		// Acceso a la base de datos (Actualmente en JSON)
		let filePath = path.join(__dirname, '../data/productos_creados.json');
		let cartelesDb = JSON.parse(fs.readFileSync(filePath,{encoding:'utf-8'}));
		let busqueda=req.query.busqueda_cartel;
		console.log(req.query.busqueda_cartel);
		
		res.render('resultado',{cartelesDb,busqueda});	
	},
	ingresar: (req, res) => {
		res.render('ingresar');
	},
	registrar: (req, res) => {
		res.render('registro');
	},
	
	
};


module.exports = controller
