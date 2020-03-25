
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
         
        },
/** 
 * Controlador para crear producto en funcion del formulario 
*/
    publishPost: (req,res)=>{

      let additionalData = {
        picture_filename: req.files[0] ? req.files[0].filename : 'no_image.png',
        user_id: req.session.userId
     }

    let signData = {
      ...req.body,
      ...additionalData
    };

    /**@todo validacion por parte del back con la funcion validateDataDb */
    console.log(signData);
    
    db.Sign.create(signData)// Se crea registro nuevo de cartel en la base de datos
      .then( () => {res.redirect('/sign/sign_list')} ) 
      .catch( error => {return res.send(signData)} ); // por el asincronismo debo ponerlo aqui
    },

/**
 * Controlador que se encarga de listar todos los cartels que dispone el usuario en cuestion
 */
    sign_list: async (req, res) => {
          db.Sign.findAll({
            include: ['techs', 'types', 'users', 'orders']
          },
          {
            where:{
            user_id: req.session.userId
          }
        })
          .then(results => {     
            console.log(results);
                   
            return res.render('sign/signList', {sign:results})
             
            })
        }, 
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
    }, 
    
    delete: (req, res) => {
 
     db.Sign.destroy ({
        where: {
          id: req.params.id
        }
      })
      res.redirect("/sign/sign_list")


    },
    saveEdit : (req, res) => {
    
      let additionalData = {
        picture_filename: req.files[0] ? req.files[0].filename : 'no_image.png',
        user_id: 1 //req.session.user.id != undefined ? req.session.user.id: 1 // por ahora no esta implementado
       }
      let signData = {
         ...req.body,
         ...additionalData
       };
   db.Sign.update(
        signData, { where: {id:req.params.id}}
        );  

      res.redirect("/sign/sign_list")
  },  


 }

module.exports = controller



