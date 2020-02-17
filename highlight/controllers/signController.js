
const express = require('express');
const router = express.Router();
const db = require("../src/database/models")
const sequelize = db.sequelize;


/*********************************************************************************/

const controller = {

    index: (req, res) => {
           sequelize.query ("SELECT * FROM users")
           .then(results => {
               //res.send (results)
               res.render("sign/index");
           })
           .catch(error => {
               console.log (error);
           });
        console.log(db.sequelize);
        
    },

}

module.exports = controller