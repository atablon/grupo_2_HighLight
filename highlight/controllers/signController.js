
const fs = require('fs');
const path = require('path');
const db = require("../src/database/models")
let { check, validationResult, body } = require('express-validator');


/*********************************************************************************/

const controller = {
  /**
   * Funcion para probar la base de datos
   */
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
            //return res.render('sign/index', { tech: results[0], type: results[1], sign: results[2]  });
            return res.send({tech: results[0], type: results[1], sign: results[2], user: results[3]});
        })

    }, 

    /**
     * Se muestra formulario de publicacion de cartel
     */
    publish: (req, res) => {
          console.log(`\n ****El usuario utilizado es ${req.session.userId}****** \n`);
          
          let tech = db.Sign_tech.findAll();
          let type = db.Sign_type.findAll();
          Promise
          .all([tech, type])
          .then(results => {
            return res.render("sign/viewPublish", {tech: results[0], type: results[1]}); 
          })
          .catch(error => { console.log(error)});
        },
/** 
 * Controlador para crear producto en funcion del formulario 
*/
    publishPost: (req,res)=>{
      // validaciones del vaquen, atrapo los errores en validationresulta. lo hacemos con express validation.
      let errors = validationResult(req)
            
      // preguntamos si no tiene errores que avance con el guardado y sino tire a la misma vista.
      if (errors.isEmpty()) {
        
            let additionalData = {
               picture_filename: req.files[0] ? req.files[0].filename : 'no_image.png',
               user_id: req.session.user.id  // esto para revisar BETO
            };
            let signData = {
              ...req.body,
              ...additionalData
            };
            db.Sign.create(signData)// Se crea registro nuevo de cartel en la base de datos
              .then(() => { res.redirect('/sign/sign_list') })
              .catch(error => { return res.send(signData) }); // por el asincronismo debo ponerlo aqui

      } else {
        console.log(errors)
        let tech = db.Sign_tech.findAll();
        let type = db.Sign_type.findAll();
        Promise
          .all([tech, type])
          .then(results => {
            return res.render("sign/viewPublish", {tech: results[0], type: results[1], errors:errors.errors});
          })
      }
     
    },

/**
 * Controlador que se encarga de listar todos los cartels que dispone el usuario en cuestion
 */
    sign_list: (req, res) => {
      
      console.log(`\n El usuario que quiero mostrar los carteles es: ${req.session.user.id}`);
      
          db.Sign.findAll({ 
          where:{user_id: req.session.user.id},
          include: ['techs', 'types','orders']
          })
          .then(results => { 
            return (res.render('sign/signList', { sign:results } ) );
          })
          .catch(error => { console.log(error) });
    }, 
/**
 * Controlador que se encarga de mostrar la vista de editar  
 */
    edit:(req, res) => {
        let idNumber = req.params.id; 
        let sign = db.Sign.findOne({  
             where: {
                id: idNumber
             },
            include: ['techs', 'types', 'users', 'orders']
          })
        let tech = db.Sign_tech.findAll();
        let type = db.Sign_type.findAll();
      Promise
        .all([sign, tech, type])
        .then(results => {
          return res.render('sign/editSign', {sign:results[0], tech:results[1], type:results[2]})
        })
        .catch(error => { console.log(error) });

    }, 

/**
* Controlador que se encarga de eliminar un cartel 
*/
    
    delete: (req, res) => {
        db.Sign.destroy ({
          where: {id: req.params.id}
        })
        .then(results => {
          return res.redirect("/sign/sign_list")
        })
        .catch(error => { console.log(error) });
    },

/**
* Controlador que se encarga de guardar las modificaciones del cartel
*/

    saveEdit : (req, res) => {
      let sign = db.Sign.findOne({
        where: {
          id: req.params.id
        }})
     
        let additionalData = {
          picture_filename: req.files[0] ? req.files[0].filename : sign.picture_filename,
          user_id: req.session.user.user_id
        }
        let signData = {
          ...req.body,
          ...additionalData
        };

       db.Sign.update(
          signData, { where: {id:req.params.id}}
          )
          .then (results => {
              return (res.redirect("/sign/sign_list"));
           })
          .catch(error => { console.log(error) });   
    },  
}

module.exports = controller



