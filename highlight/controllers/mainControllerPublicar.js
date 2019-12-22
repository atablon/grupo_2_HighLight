const fs = require('fs');
const path = require('path');



const controller = {

    publicar: (req, res) => {
        res.render('publicar');
    },

};
module.exports = controller