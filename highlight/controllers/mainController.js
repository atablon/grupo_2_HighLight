const fs = require('fs');
const path = require('path');

// // ************ Function to Read an HTML File ************
// function readHTML (fileName) {
// 	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
// 	let htmlFile = fs.readFileSync(filePath, 'utf-8');
// 	return htmlFile;
// }

const controller = {
	root: (req, res) => {
		res.render("index");
	},
	root_carrito: (req, res) => {
		res.render('carrito');
	},
	root_resultado: (req, res) => {
		// Aca es donde debo incorporar la logica de busqueda y pasar como argumento de res.render('resultado', objetos encontrados) 
		// hay que buscar en el json

		let filePath = path.join(__dirname, '../data/productos_creados.json');
		
		let cartelesDb = JSON.parse(fs.readFileSync(filePath,{encoding:'utf-8'}));
		console.log(cartelesDb[1]);
		
		res.render('resultado',{cartelesDb});	
	},
	ingresar: (req, res) => {
		res.render('ingresar');
	},
	registrar: (req, res) => {
		res.render('registro');
	},
	
	
};

module.exports = controller
