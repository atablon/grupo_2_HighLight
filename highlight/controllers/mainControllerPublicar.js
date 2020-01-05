const fs = require('fs');
const path = require('path');

/* ubicacion del archivo producto json*/
const ubicacionProductosJSON = path.join(__dirname,'../data/productos_creados.json');
const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8'); // leo el json
let productos = JSON.parse(contenidoProductosJSON);// comvierto en array

/* ordeno por el elemento id de cada obejto del array*/
productos.sort(function (a, b) {
    if (a.id < b.id) {
        return 1;
    }
    if (a.name > b.name) {
        return -1;
    }
    return 0;
});


const controller = {

    crear: (req, res) => {
        res.render('publicar');
    },
    detalle: (req, res) => {
        res.render('detalle');
    }, 
    crearcartel : (req, res, next) => {
  
        // array 
        let arrayDeProductos = [];
        const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8'); // leo el json
        let productos = JSON.parse(contenidoProductosJSON);// comvierto en array
        // Si el archivo no está vacío 
        
        if (contenidoProductosJSON != '') {
            // tomo el contenido y lo convierto en un formato de Array de objetos literales
            arrayDeProductos = JSON.parse(contenidoProductosJSON);
        }
      
        let cantidad = 0;
        switch (req.body.trafico) {
            case 'Hasta 3000 personas':
                cantidad =+ 1;
                console.log(cantidad);
                break;
            case 'Hasta 10000 personas':
                cantidad =+ 2;
                console.log(cantidad);
                break;
            case 'Entre 10000 y 20000 personas':
                cantidad =+ 3;
                console.log(cantidad);
                break;
            default:
                cantidad =+ 4;
        }
        // Genero el id para el producto
        
        let images = req.files[0].filename
        req.body = {
            id: arrayDeProductos.length + 1,
            estrellas: cantidad,
            imagen: images,
            ...req.body,
         
        };
        // Inserto el producto nuevo
        arrayDeProductos.push(req.body);

        // Convierto el arrayDeProductos a JSON
        let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');

        // guardo el array completo en el archivo JSON
        fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);

        res.redirect("/listado")
    }, 
    listado: (req, res) => {
        const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8'); // leo el json
        let productos = JSON.parse(contenidoProductosJSON);// comvierto en array
        res.render('listaProductos', {productos});
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
        }, 
  
    seleccionarCartel: (req, res) => {
        let idCartel = req.params.id;
        let cartelElegido = productos.find(function(cartel){
           return cartel.id == idCartel

        });
    
        res.render('editarCartel', {cartelElegido});
    }, 

    modificar: (req, res) => {

        let productosSinElQueModificacmos = productos.filter(function (unProducto) {
            return unProducto.id != req.params.id;
        })
        let idNumber = parseInt(req.params.id)
        req.body = {
            id: idNumber, 
            ...req.body, 
        }

        /* Agrego el producto modificado */
        productosSinElQueModificacmos.push(req.body)
         
        // Convierto el arrayDeProductos a JSON
        let contenidoAGuardar = JSON.stringify(productosSinElQueModificacmos, null, ' ');

        // guardo el array completo en el archivo JSON
        fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);
        res.redirect('/listado');
    } 
   

    
};
module.exports = controller