
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
          let tech = db.Sign_tech.findAll();
          let type = db.Sign_type.findAll();
          Promise
          .all([tech, type])
          .then(results => {
            return res.render("sign/viewPublish", {tech: results[0], type: results[1]}); 
          })
         
        },
/** 
 * Controlador para crear producto en funcion del formulario 
*/
    publishPost: (req,res)=>{

      let additionalData = {
        picture_filename: req.files[0] ? req.files[0].filename : 'no_image.png',
        user_id: 1 //req.session.user.id != undefined ? req.session.user.id: 1 // por ahora no esta implementado
     }

    let signData = {
      ...req.body,
      ...additionalData
    };

    /**@todo validacion por parte del back con la funcion validateDataDb */

    db.Sign.create(signData)// Se crea registro nuevo de cartel en la base de datos
      .then( () => res.redirect('/sign/sign_list') ) 
      .catch( error => {return res.send(signData)} ); // por el asincronismo debo ponerlo aqui
    

    },

/** Controlador que se encarga de listar todos los cartels que dispone el usuario en cuestion */
    sign_list: async (req, res) => {
          db.Sign.findAll({
            include: ['techs', 'types', 'users', 'orders']
          })
          .then(results => {
                          
             return res.render('sign/signList', {sign:results})
             
            })
        }, 
    edit:(req, res) => {

      let idNumber = req.params.id; 
  /**@todo pato quiere ver porque usa no le funciona un findOne */
      db.Sign.findAll({  
        where: {
            id: idNumber
         }, 
        include: ['techs', 'types', 'users', 'orders']
       })
      .then(results => {
      
        //return res.send(results)
        return res.render('sign/editSign', { sign: results})
      
      })
  }, 
    delete: (req, res) => {
      res.send("delete")
    },
 }

module.exports = controller



