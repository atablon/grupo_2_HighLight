const db = require("../src/database/models")

const controller = {
    detalle: (req, res) => {
            db.Sign.findOne({ 
                where: { id:req.params.id }, 
                include: ['techs', 'types']                     
            })
            .then(results => { 
                return res.render('detalle', { sign: results }) 
                //return res.send(results)
            })
            .catch(error => { console.log(error) });
    }
} 

module.exports = controller