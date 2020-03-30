//const JsonModel = require('../models/jsonModel');

//const usersModel = new JsonModel('users');
//const userTokensModel = new JsonModel('userTokens');

const db = require("../src/database/models");

/**
 * Funcion middleware que se ejecuta cada vez que se renderiza una vista
 */
const locals = (req, res, next) => {
    // https://expressjs.com/es/4x/api.html
    

    res.locals.isAuthenticated = false;
    
    if (req.session.user) {
        res.locals.isAuthenticated = true;
        res.locals.user = req.session.user;     
        console.log(`\n***** Se ingreso al middleware y el usuario es ${res.locals.user.user_name} ***** \n`);
           
    } else if (req.cookies.userCookie) {
        // Si existe el token en la colección entonces es válido
       // console.log(`*********** LAS COOKIES SON ${req.cookies.userCookie} ***************`);
        
        db.User.findByPk(req.cookies.userCookie)
        .then(result=>{
            if(result){
               // console.log(`*********** ANDUVO LA CONSULTA ${result.user_name}   ***************`);
        
                delete result.user_password;

                res.locals.isAuthenticated = true;

                res.locals.user = result;
                
                req.session.user = result;

                //console.log(`\n **** Se entro y se verifico una cookie valida para el usuario ${result.user_name} ***** \n`);
                
                next();
            } else{

                res.cookie('userCookie', null, { maxAge: -1 });
            }
            next();
        })
        .catch(error => {
            console.log(error);
            next();
        });
    }
    
    next();
}

module.exports = locals;