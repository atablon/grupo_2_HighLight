const db = require("../../src/database/models")

const Op = db.Sequelize.Op;

const controller = {

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
    userDetail: (req,res)=>{

        db.User.findOne({ 
            where: { id:req.params.id },
            attributes: ['id','user_name', 'email','user_type','profile_picture'],                
        })
        .then(usuario => { 

            let respuesta = {
                meta:{
                    status: 200, 
                    Total: results.length
                }, 
                data : usuario
            }
            res.json(respuesta);
            
        })
        .catch(error => { console.log(error)});
    }

}





module.exports = controller;