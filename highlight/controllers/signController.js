
const fs = require('fs');
const path = require('path');
const db = require("../src/database/models")


/*********************************************************************************/


const controller = {
    index: async (req, res) => {
        let tech = db.Sign_tech.findAll({
          include: ['signs'] 
        });
        let type = db.Sign_type.findAll({
          include: ['signs']
        });
        let sign = db.Sign.findAll({
          include: ['techs','types','users','orders']
        });
        let users = db.User.findAll({
          include: ['signs']
        });
        let orders = db.Order.findAll({
          include: ['signs','users']
        });
        Promise
        .all([tech, type, sign, users])
        .then (results => {
            console.log(results[1]);
            //return res.render('sign/index', { tech: results[0], type: results[1], sign: results[2]  });
            return res.send({tech: results[0], type: results[1], sign: results[2], user: results[3]});
        })

    }, 

    /**
     * Se muestra formulario de publicacion de cartel
     */
    publish: (req, res) => {
      res.render("sign/viewPublish");
      
    },
    sign_list: (req, res) => {
      // Aca tengo que crear el cartel y levantar la dB de los usuarios que se encuentra en session y mostrarlos
      // 1. Verficar que usuario es el que esta creando en la sesion
      // 2. Parsear todos los datos provenientes del formulario, osea la verificacion del back
      // 3. Crear el registro en la dB
      
      //Comienzo de creacion del registro en la dB
    
  
      console.log("creando")
      // Ojo que aca tiene que ir lo que va en la imagen por defecto "default_img.png"
      console.log(req.body);
     

      let additionalData = {
          images: req.files[0] ? req.files[0].filename : 'no_image.png',
          user_id: 1 //req.session.user.id != undefined ? req.session.user.id: 1 // por ahora no esta implementado
       }

      let signData = {
        ...req.body,
        ...additionalData
      };

      res.send(signData);

      // db.Sign.create(signData)
      //   .then(() => res.redirect('/products/listado'))
      //   .catch(error => console.log(error));


      return console.log('PUBLICADO');
      
    }
 }

module.exports = controller



