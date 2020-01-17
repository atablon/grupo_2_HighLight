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
        DatosCompletos: false,
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

/* Funcion para guardar el contenido del publicar paso DOS del producto */
function guardarSegundaParte(datosPasoDos) {
    // busco todos los productos
    let listaDeProductos = productos();
    let ultimoProducto = listaDeProductos.pop();
    delete ultimoProducto['DatosCompletos']

    // Estoy creando el nuevo obejto agregando las nuevas propiedades. 
    // Esto hay que revisarlo porque seguro hay algo mejor. 
    ultimoProducto = {
        ...ultimoProducto,
        ...datosPasoDos
    }

    listaDeProductos.push(ultimoProducto);
    // guardo la lista de productos al jsom
    fs.writeFileSync(ubicacionProductosJSON, JSON.stringify(listaDeProductos, null, ' '));
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

const controller = {
        // get de publicar
        publicar: (req, res) => {
        res.render('publicar_ubicacion');
        },


        // Post de crear cartel
        ubicacion: (req, res) => {
            // guardar el producto
            let images = req.files[0].filename;
            req.body = {
                imagen: images,
                ...req.body,
            };
            guardarPrimeraParte(req.body)
            res.render('publicar_especificaciones');
        },


        // Post de crear cartel paso 2.
        especificaciones: (req, res) => {

            // guardar más datos al producto y calcular valor para las estrellas
            req.body = {
                estrellas: asignarEstrellas(req.body.trafico),
                ...req.body,
            };
            guardarSegundaParte(req.body)
            res.redirect('listado');
        },
    listado: (req, res) => {
        let listaDeProductos = productosFiltrados();
        res.render('listaProductos', { listaDeProductos });
    }, 
    editar: (req, res) => {

    },

    }

module.exports = controller