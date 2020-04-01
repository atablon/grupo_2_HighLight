
const db = require("../../src/database/models")

const Op = db.Sequelize.Op;
/*********************************************************************************/

const controller = {
    /**
     * Funcion para probar la base de datos
     */
    list:(req, res) => {

           let signAll = db.Sign.findAll({
                include: ['techs', 'types']
            })

            let signFilter = db.Sign.findAll({
                where: { star: 5  }
                  
            })
            let signTypes1 = db.Sign.findAll({
                where: { type_id: 1 }
            })
            let signTypes2 = db.Sign.findAll({
                where: { type_id: 2 }
            })
            let signTypes3 = db.Sign.findAll({
                where: { type_id: 3 }
            })

             let zoneCF = db.Sign.findAll({
                where: { state: "Ciudad de Buenos Aires"    }
            })

            let zoneGBA = db.Sign.findAll({
                    where: { state: "Gran Buenos Aires" }
                })

            Promise
                .all([signAll, signFilter, signTypes1, signTypes2, signTypes3, zoneCF, zoneGBA])
            .then(results => {
                let signAll = results[0];
                let signFilter = results[1];
                let signTypes1 = results[2];
                let signTypes2 = results[3];
                let signTypes3 = results[4];
                let zoneCF = results[5];
                let zoneGBA = results[5]

                for (let i = 0; i < signAll.length; i++) {
                    signAll[i].setDataValue("endpoint", "/api/sign/" + signAll[i].id )
                }

               

                let carteles = {
                    meta :  {
                        status: 200,
                        TotalDeProductos: signAll.length + " carteles",
                        DestacadosConCincoEstrellas: signFilter.length + " carteles",  
                    
                    }, 
                    Zona: {
                        CapitalFederal: zoneCF.length + " carteles",
                        GranBuenosAires: zoneGBA.length + " carteles"

                    }, 
                    TipoDeCartel: {
                        TipoID1: "Cartel de Kioscos, Diarios y Florerias",
                        Total1: signTypes1.length,
                        TipoID2: "Cartel de Vallas",
                        Total2: signTypes2.length,
                        TipoID3: "Cartel Frontlights y Backlights",
                        Total3: signTypes3.length,
                    }, 

                    data: signAll, 
                
                }
              return res.json({carteles});
            })
     },
    find:(req, res) => {
        db.Sign.findOne({
            where: { id: req.params.id },
            include: ['techs', 'types']
        })
            .then(results => {
                return res.json({ results })
            })
            .catch(error => { console.log(error) });
    }, 
    findFiveStar: (req, res) => {
        db.Sign.findAll({
            where: { star: 5 },
            include: ['techs', 'types']
        })
            .then(results => {
                return res.json({ results })
            })
            .catch(error => { console.log(error) });

    },

    type: (req, res) => {
            db.Sign.findAll({
                where: { type_id: req.params.id }
            })
            
            .then(results => {

                let carteles = {
                    meta:{
                        status: 200, 
                        Total: results.length
                    }, 
                    data : results
                }
              return res.json({carteles})
            })
            .catch(error => { console.log(error) });
    }, 
    lowestCost: (req,res)=>{

        let searchCost = req.query.cost;

        console.log(`\n\n ESTO ES LO QUE SE BUSCA ${searchCost}    *********\n\n`);
        
        
        if(!isNaN(searchCost)){

            db.Sign.findAll({
                where:{  
                    monthly_cost:{  [Op.lte]: searchCost  }
                }
            })
            .then(results=>{
                              
                let lowerCostSigns = {
                    meta:{
                        status: 200, 
                        Total: results.length
                    }, 
                    data : results
                }
                res.json(lowerCostSigns);
            })
            .catch(error=>console.log(error));

        } else {
            res.json(`Error /api/sign/lowestCost solo puede recibir numeros`);
        }

        
    },


     

}

module.exports = controller



