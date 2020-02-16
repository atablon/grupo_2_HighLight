
//const db = require("../src/database/models")
//const db = require("../src/database/models");
//const sequelize = db.sequelize ;
const express = require('express');
const router = express.Router();



/*********************************************************************************/

const controller = {
    // get de publicar
    index: (req, res) => {
   res.render("sign/index")
    },

}

module.exports = controller