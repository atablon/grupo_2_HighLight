
const fs = require('fs');
const path = require('path');
const db = require("../src/database/models")


/*********************************************************************************/


<<<<<<< HEAD
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
=======

const controller = {
    index: async (req, res) => {
        let tech = db.Sign_tech.findAll();
        let type = db.Sign_type.findAll();
        let sign = db.Sign.findAll();
        Promise
        .all([tech, type, sign])
        .then (results => {
            console.log(results[0]);
            return res.render('sign/index', { tech: results[0], type: results[1], sign: results[1]  });
        })

       }
}
       
>>>>>>> 289109001fef8ed0f99b811a5c2c007984d2e41d


module.exports = controller


// const controller = {
    
//     index: (req, res) => {
//         db.Sign_tech.findAll()
//         .then(results => {
//             console.log(results)
//                return res.render('sign/index', {results});
//            })
//         .catch(function (error) {
//              console.log(error)
//         })
//     } 
// }


