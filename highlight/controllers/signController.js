
const express = require('express');
const router = express.Router();
const db = require("../src/database/models")
const sequelize = db.sequelize


/*********************************************************************************/

const controller = {

    index: (req, res) => {
        db.tecnologia 
        .findAll()
        .then(results => {
            res.send(results)
        })
        .catch(function(error) {
            console.log(error)
        })
  
        
        //  sequelize.query('SELECT * FROM tecnologia')
        //   .then(resultados => {
        //       console.log(resultados)
        //       res.render("sign/index", { user: resultados } )
         
        //    })
        //    .catch(function (error) {
        //        console.log(error)
        //     })
           // res.render("sign/index")
       // res.send(console.log(sequ))
    },

    publish: (req, res) => {
        
        Sign_techs
    },

}

module.exports = controller