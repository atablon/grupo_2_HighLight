
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

    publish: (req, res) => {
          let tech = db.Sign_tech.findAll();
          let type = db.Sign_type.findAll();
          Promise
          .all([tech, type])
          .then(results => {
            return res.render("sign/viewPublish", {tech: results[0], type: results[1]}); 
          })
         
        },
    sign_list: async (req, res) => {
          db.Sign.findAll({
            include: ['techs', 'types', 'users', 'orders']
          })
          .then(results => {
              console.log(results);
             
             return res.render('sign/signList', {sign:results})
             //return res.send (results)
            })
        }, 
    edit:(req, res) => {

      let idNumber = req.params.id; 
   /// VER por que no un findONE .. no me funciona
      db.Sign.findOne({  
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



