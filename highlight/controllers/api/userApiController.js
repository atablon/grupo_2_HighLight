const db = require("../../src/database/models")

const Op = db.Sequelize.Op;

const controller = {

    /**
     * Api controller que entrega el listado de todos los usuarios con todos los atributos menos el password 
     */
    usersList: (req,res)=>{

        db.User.findAll({
            attributes: ['id','user_name', 'email','user_type','profile_picture']
        })
        .then(userList=>{

            for (let i = 0; i < userList.length; i++) {
                userList[i].setDataValue("endpoint", `/api/users/${userList[i].id}` )
            }

            let respuesta = {
                meta:{
                    status:200,
                    Total:userList.length
                },
                data: userList
            }
            res.json(respuesta);
        })
        .catch(error=>console.log(error));
        

    },
    /**
     * API controller que entrega los detalles de un usuario en particular, sin incluir el password de este
     */
    userDetail: (req,res)=>{

        db.User.findOne({
            attributes: ['id','user_name', 'email','user_type','profile_picture']
        },{ 
            where: { id:req.params.id },              
        })
        .then(usuario => { 

            let respuesta = {

                meta:{
                    status: 200, 
                }, 
                data : usuario
            }

            res.json(respuesta);
            
        })
        .catch(error => { console.log(error)});
    }

}

module.exports = controller;