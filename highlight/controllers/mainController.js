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
	root_detalle: (req, res) => {
		res.render('detalle');	
	},
	
};

module.exports = controller
