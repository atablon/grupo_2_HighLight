const fs = require('fs');
const path = require('path');

// // ************ Function to Read an HTML File ************


const controller = {
	root: (req, res) => {
		
		// Acceso a la base de datos (Actualmente en JSON)
		
		let filePath = path.join(__dirname, '../data/productos_creados.json');
		let cartelesDb = JSON.parse(fs.readFileSync(filePath,{encoding:'utf-8'}));

		res.render("index",{cartelesDb}); // Hago el render y envio los datos de los carteles que se van a plotear en la pantalla principal
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
