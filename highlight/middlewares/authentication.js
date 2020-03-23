//const JsonModel = require('../models/jsonModel');

//const usersModel = new JsonModel('users');
//const userTokensModel = new JsonModel('userTokens');

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
           
    }

    next();
}

module.exports = locals;