
const fs = require('fs');
const path = require('path');

const db = require("../src/database/models")



/*********************************************************************************/

const controller = {

    index: (req, res) => {
        db.tecnología 
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