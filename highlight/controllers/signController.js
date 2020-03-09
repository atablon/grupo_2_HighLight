
const fs = require('fs');
const path = require('path');
const db = require("../src/database/models")


/*********************************************************************************/


const controller = {
    index: async (req, res) => {
        let tech = db.Sign_tech.findAll({
          include: ['signs'] 
        });
        let type = db.Sign_type.findAll({
          include: ['signs']
        });
        let sign = db.Sign.findAll({
          include: ['techs','types','users',]//'orders']
        });
        let users = db.User.findAll({
          include: ['signs']
        });
        let orders = db.Order.findAll();
        Promise
        .all([tech, type, sign, users, orders])
        .then (results => {
            console.log(results[4]);
            //return res.render('sign/index', { tech: results[0], type: results[1], sign: results[2]  });
            return res.send({tech: results[0], type: results[1], sign: results[2], user: results[3], orders: results[4]});
        })

       }
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


