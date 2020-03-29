const fs = require('fs');
const path = require('path');
const db = require("../src/database/models")




const controller = {

    // detalle: (req, res) => {
    //     let filePath = path.join(__dirname, '../data/listaproductos.json');
		
	// 	let cartelesDb = JSON.parse(fs.readFileSync(filePath,{encoding:'utf-8'}));
    //     let cartel_solicitado=req.params.CartelId;

    //     cartelDetalle = cartelesDb.filter(cartel => {return cartel.id==cartel_solicitado}).pop();
	// 	console.log(cartelDetalle);
        
    //     res.render('detalle',{cartelDetalle});
    // },
    detalle: (req, res) => {
             db.Sign.findOne({
                    include: ['techs', 'types', 'users', 'orders']
                 },
                {
                where: { id: req.params.id }
                })
            .then(results => { return res.render('detalle', { sign: results }) })
            .catch(error => { console.log(error) });
    }
} 

module.exports = controller