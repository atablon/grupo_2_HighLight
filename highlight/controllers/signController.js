
const express = require('express');
const router = express.Router();
const db = require("../src/database/models")
const sequelize = db.sequelize


/*********************************************************************************/

const controller = {

    index: (req, res) => {
        db.user 
        .findAll()
        .then(resultados => {
              res.render(resultados)
           })
       .catch(function (error) {
            console.log(error)
           })
         
    }



}

module.exports = controller