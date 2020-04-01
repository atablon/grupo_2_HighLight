const fs = require('fs');
const path = require('path');
const db = require("../src/database/models")
const Op = db.Sequelize.Op;
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
		res.render('cart/carrito');
	},
	root_resultado: (req, res) => {
		
		let busqueda=req.query.busqueda_cartel;

		db.Sign.findAll({
			where:{
				[Op.or]: [
					{
						address: {
							[Op.like]: `%${busqueda}%`
							}
					},
					{
						street_1: {
							[Op.like]: `%${busqueda}%`
							}
					},
					{
						street_2: {
								[Op.like]: `%${busqueda}%`
							}
					},
					{
						city: {
							[Op.like]: `%${busqueda}%`
						}
					},{
						state: {
							[Op.like]: `%${busqueda}%`
						}
					}
				]}
		,
			include:['techs','types','users','orders']
		})
		.then(results=>{

			res.render('resultado',{cartelesDb:results,busqueda});

		})
		.catch(error=>{
			console.log(error);
		});
		
		
	},

};


module.exports = controller
