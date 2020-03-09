
const fs = require('fs');
const path = require('path');
const db = require("../src/database/models")


/*********************************************************************************/


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


