
const fs = require('fs');
const path = require('path');
const db = require("../src/database/models")



/*********************************************************************************/

const controller = {

    index: (req, res) => {
      //  res.send('hola');
       
        db.Sign
        .findAll({
          include: ['users']
        })
        .then(resultados => {
              return res.send(resultados);
              console.log(resultados);
              res.render('sign/index',{resultados});
              
           })
         .catch(function (error) {
            //console.log(error)
           })
         
    }


}

module.exports = controller