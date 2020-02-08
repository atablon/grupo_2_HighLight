const fs = require('fs');
const path = require('path');

/* ubicacion del archivo producto json*/
const ubicacionProductosJSON = path.join(__dirname, '../data/listaproductos.json');

/* leer el archivo json y trar el array de la lista de productos */
function productos() {
    const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8'); // leo el json
    let listaDeProductos = JSON.parse(contenidoProductosJSON);// comvierto en array
    return listaDeProductos;
    }


/* leer el archivo json sacar los que que no tienen datos completos */
function productosFiltrados() {
    const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8'); // leo el json
    let listaDeProductos = JSON.parse(contenidoProductosJSON);// comvierto en array
    let productosFiltrados = listaDeProductos.filter (function(producto){
        return producto["DatosCompletos"] == undefined
    })
    return productosFiltrados;
}


/* Funcion para guardar el contenido del publicar paso uno del producto */
function guardarPrimeraParte (nuevoProducto) {
    // busco todos los productos
    let listaDeProductos = productos();

    // genero el nuevo producto + id
    nuevoProducto = {
        id: generarId(),
        ...nuevoProducto
    };
    // guardo el nuevo prouducto
    listaDeProductos.push(nuevoProducto);
    // guardo la lista de productos al json
    fs.writeFileSync(ubicacionProductosJSON, JSON.stringify(listaDeProductos, null, ' '));
    }


/* Funcion para generar ID*/
function generarId() {
    // busco todos los productos
    let listaDeProductos = productos();
    // me fijo si hay id asignado
    if (listaDeProductos.length == 0) {
        return 1
    }
    // busco el ultimoproducto para tomar el id y sumar uno
    let ultimoProducto = listaDeProductos.pop();
    return ultimoProducto.id + 1;
    }



/* Funcion para asignar valor de estrellas */
function asignarEstrellas(valor) {
    let cantidadEstrellas = 0;
    switch (valor) {
        case 'Hasta 3000 personas':
            cantidadEstrellas = + 1;
            break;
        case 'Hasta 10000 personas':
            cantidadEstrellas = + 2;
            break;
        case 'Entre 10000 y 20000 personas':
            cantidadEstrellas = + 3;
            break;
        default:
            cantidadEstrellas = + 4;
    }
    return cantidadEstrellas

}


/* Funcion para saber el producto seleccionado */
function productoSelect (id) {
    let listaDeProductos = productos();
    let idProducts = id;
    let productSelect = listaDeProductos.find(function (productSelect) {
        return productSelect.id == idProducts
    });
    return productSelect;
  
}



/* Funcion para guardar las modificaciones*/
function guardarPrimeraParteModificada(datos) {
    let listaDeProductos = productos();
    listaDeProductos.push(datos);
    // guardo la lista de productos al jsom
    fs.writeFileSync(ubicacionProductosJSON, JSON.stringify(listaDeProductos, null, ' '));
}






/*********************************************************************************/

const controller = {
        // get de publicar
        publicar: (req, res) => {
        res.render('publicar_ubicacion');
        },

        // Post de crear cartel
        publicarProducto: (req, res) => {
            // guardar el producto
            let images = req.files[0].filename;
            req.body = {
                imagen: images,
                estrellas: asignarEstrellas(req.body.trafico),
                ...req.body,
            };
            guardarPrimeraParte(req.body)
            res.redirect('listado');    
        },


        listado: (req, res) => {
            let listaDeProductos = productosFiltrados();
            res.render('listaProductos', {listaDeProductos});
        }, 

        modificar: (req, res) => {
            let productSelect = productoSelect(req.params.id);
            res.render("publicar_ubicacion_edit", {productSelect});
        },

        // Put para modificar un producto
        modificarProducto: (req, res) => {

            /* Encuentro el producto sellecionado y paso img */
            let productSelect = productoSelect(req.params.id);
            let imagen = productSelect.imagen
    
            /* Junto información agrego campo de duplicado para luego borar en el paso 2 */
            req.body = {
                id: req.params.id,
                imagen: imagen,
                ...req.body,
            };

            /* Guardo la información paso info y listado de productos*/
            guardarPrimeraParteModificada(req.body)
        
            res.render('publicar_especificaciones_edit', { productSelect })
          
        }, 

            eliminar: (req, res) => {
                // TERMINAR PATO    
             //   let productosSinElQueBorramos = productos.filter(function (unProducto) {
              //      return unProducto.id != req.params.id;
               // })
                // guardo el array con los productos finales

                // Convierto el arrayDeProductos a JSON
              //  let contenidoAGuardar = JSON.stringify(productosSinElQueBorramos, null, ' ');

            
                let listaDeProductos = productosFiltrados();
                res.render('listaProductos', { listaDeProductos });
            }, 
        
     }

module.exports = controller