const fs = require('fs');
const path = require('path');

/* ubicacion del archivo producto json*/
const ubicacionProductosJSON = path.join(__dirname,'../data/productos_creados.json');
const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');
let productos = JSON.parse(contenidoProductosJSON);


const controller = {

    publicar: (req, res) => {
        res.render('publicar');
    },
    detalle: (req, res) => {
        res.render('detalle');
    }, 
    crearcartel : (req, res) => {
        // array 
        let arrayDeProductos = [];

        // Si el archivo no está vacío 
        
        if (contenidoProductosJSON != '') {
            // tomo el contenido y lo convierto en un formato de Array de objetos literales
            arrayDeProductos = JSON.parse(contenidoProductosJSON);
        }
        console.log(req.body)
        // Genero el id para el producto
        req.body = {
            id: arrayDeProductos.length + 1,
            ...req.body, 
         
        };


        // Inserto el producto nuevo
        arrayDeProductos.push(req.body);

        // Convierto el arrayDeProductos a JSON
        let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');

        // guardo el array completo en el archivo JSON
        fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);

        res.send("Listo")
    }, 
    listado: (req, res) => {
        res.render('listaProductos', { productos});
    }, 
     borrarCartel: (req, res) => {
            let productosSinElQueBorramos = productos.filter(function (unProducto) {
                return unProducto.id != req.params.id;
            })
            // guardo el array con los productos finales

         // Convierto el arrayDeProductos a JSON
         let contenidoAGuardar = JSON.stringify(productosSinElQueBorramos, null, ' ');

         // guardo el array completo en el archivo JSON
         fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);
         res.redirect('/listado');
        }
        
    
};
module.exports = controller