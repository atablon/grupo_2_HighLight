
const fs = require('fs');
const path = require('path');
const db = require("../src/database/models")



/*********************************************************************************/

const controller = {

    index: (req, res) => {
    res.render("sign/index")
       // NO ME LEVANTA RESULTADOS EN LA VISTA Y NO SE POR QUE
        db.tecnologia
        .findAll()
        .then(resultados => {
              res.render("/sing/index", {resultados:resultados})
           })
         .catch(function (error) {
            console.log(error)
           })
         
    }


}

module.exports = controller