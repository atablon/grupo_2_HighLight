const fs = require('fs');
const path = require('path');
const db = require("../src/database/models")

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
			let signStar = db.Sign.findAll({
				order:[["star", "DESC"]],
				limit: 4
			})
			 let signCost = db.Sign.findAll({
			 	order: [["monthly_cost", "ASC"]],
			 	limit: 4
			})
			Promise
			.all([signStar, signCost])
			.then(results => { 
				return res.render('index',{signStar: results[0], signSale: results[1]})
			})
			.catch(error => { console.log(error) });
	
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
