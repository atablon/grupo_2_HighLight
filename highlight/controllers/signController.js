
const express = require('express');
const router = express.Router();
const db = require("../src/database/models")
const sequelize = db.sequelize;


/*********************************************************************************/

const controller = {
    // get de publicar

    index: (req, res) => {
        // sequelize
        // .query ("SELECT * FROM")
        // .then(results => {
        //     res.send (results)
        // })
        // .cacth(error => {
        //     console.log (error)
        // })
   //res.render("sign/index")
    },

}

module.exports = controller