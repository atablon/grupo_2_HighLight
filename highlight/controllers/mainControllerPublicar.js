const fs = require('fs');
const path = require('path');


let productos = [{
    "nombre": "Cartel"
}, {
        "nombre": "Cartelera"
}]

const controller = {

    publicar: (req, res) => {
        res.render('publicar', {productos});
    },
    detalle: (req, res) => {
        res.render('detalle');
    },

};
module.exports = controller