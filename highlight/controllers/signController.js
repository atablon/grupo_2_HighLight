
const fs = require('fs');
const path = require('path');
const db = require("../src/database/models")



/*********************************************************************************/

const controller = {

    index: (req, res) => {
       // res.render('sign/index');
       
        db.Sign
        .findAll()
        .then(resultados => {
              //res.send(resultados);
              console.log(resultados);
              res.render('sign/index',{resultados:signs});
              
           })
         .catch(function (error) {
            //console.log(error)
           })
         
    }


}

module.exports = controller