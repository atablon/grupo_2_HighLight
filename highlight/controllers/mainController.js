const fs = require('fs');
const path = require('path');


// Constants
const userFilePath = path.join(__dirname, '../data/users.json');

// Helper Functions
function getAllUsers() {
	let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
	let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent);
	return finalUsers;
}

function getUserById(id) {
	let allUsers = getAllUsers();
	let userById = allUsers.find(oneUser => oneUser.id == id);
	return userById;
}

const controller = {
	root: (req, res) => {
		
		// Acceso a la base de datos (Actualmente en JSON)
		
		let filePath = path.join(__dirname, '../data/productos_creados.json');
		let cartelesDb = JSON.parse(fs.readFileSync(filePath,{encoding:'utf-8'}));
		let user = [];
		//

		console.log(req.session.userId);// para debug
		
		if(req.session.userId!= undefined){
			user = getUserById(req.session.userId);
			console.log(user);
		}else{
			console.log('NO HAY PERSONA LOGUEADA');
			
		}
		res.render("index",{cartelesDb, user}); 
	
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
