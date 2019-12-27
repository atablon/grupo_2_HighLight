const fs = require('fs');
const path = require('path');

/* ubicacion del archivo producto json*/
const ubicacionProductosJSON = path.join(__dirname,'../data/productos_creados.json');
const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');



const controller = {

    publicar: (req, res) => {
        res.render('publicar');
    },
    detalle: (req, res) => {
        res.render('detalle');
    }, 
    crearproducto : (req, res) => {
        // array 
        let array = [];

        // Si el archivo no está vacío 
        
        if (contenidoProductosJSON != '') {
            // tomo el contenido y lo convierto en un formato de Array de objetos literales
            arrayDeProductos = JSON.parse(contenidoProductosJSON);
        }

        // Genero el id para el producto
        req.body = {
            id: arrayDeProductos.length + 1,
            ...req.body
        };


        // Inserto el producto nuevo
        arrayDeProductos.push(req.body);

        // Convierto el arrayDeProductos a JSON
        let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');

        // guardo el array completo en el archivo JSON
        fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);

        res.send("Listo")
    } 
   

};
module.exports = controller