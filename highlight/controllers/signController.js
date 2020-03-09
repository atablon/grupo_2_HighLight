
const fs = require('fs');
const path = require('path');
const db = require("../src/database/models")


/*********************************************************************************/

const controller = {
    index: (req, res) => {
        res.send('hola');
       
        // db.Sign
        // .findAll({
        //   include: ['users']
        // })
        // .then(resultados => {
        //       return res.send(resultados);
        //       console.log(resultados);
        //       res.render('sign/index',{resultados});
              
        //    })
        //  .catch(function (error) {
        //     //console.log(error)
        //    })
         
        }, 
        publish: (req, res) => {
          res.render("sign/viewPublish"); 
        }, 
        sign_list: (req, res) => {
          res.send("Publicado")
        }, 


}


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


