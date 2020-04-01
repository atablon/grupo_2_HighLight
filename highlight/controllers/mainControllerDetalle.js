const db = require("../src/database/models")

const controller = {
    /**
     * Controlador de detalle encargado de tomar los datos del cartel elegido y renderizar la vista detalle.ejs
     */
    detalle: (req, res) => {
            db.Sign.findOne({ 
                where: { id:req.params.id }, 
                include: ['techs', 'types','users']                     
            })
            .then(results => { 
                return res.render('detalle', {sign: results }) 
                //return res.send(results)
            })
            .catch(error => { console.log(error)});
    }
} 

module.exports = controller