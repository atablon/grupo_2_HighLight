
const fs = require('fs');
const path = require('path');
const db = require("../src/database/models")



/*********************************************************************************/

const controller = {
// Ejemplo 1 
    // index: async (req, res) => {
    //   //res.render('sign/index');
    //     let signs = await db.Sign_tech.findAll();
    //     let other = await db.Other.findAll();

    //     return res.render('sign/index', { signs, other });

       
    // }, 

    // Ejemplo 2
// 
        index: async (req, res) => {
            let signs = db.Sign_tech.findAll();
            let type = db.Sign_type.findAll();
        Promise
            .all([signs, type])
            .then(results => {
                return res.render('sign/index', { signs: results[0], type: results[1] });
            })
                .catch(function (error) {
                    console.log(error)
                })

        }


}

module.exports = controller