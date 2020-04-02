/**
 * Modulos requeridos
 */
const createError = require('http-errors');

const cookieParser = require('cookie-parser');

const express = require('express');

const logger = require('morgan');

const path = require('path');

const methodOverride = require('method-override');

const session = require('express-session');

const authentication = require('./middlewares/authentication');

/**
 * Express, no tocar!
 */
const app = express();

/**
 * Middlewares, no tocar!
 */
app.use(express.static(path.join(__dirname, 'public')));  // Necesario para los archivos estáticos en el folder /public

app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));

app.use(express.json());

app.use(cookieParser());

app.use(session({
  secret: 'register-login',
  resave: false,
  saveUninitialized: true
})); // datos caracteristicos de la sesion

app.use(authentication);

app.use(methodOverride('_method'));// override with POST having ?_method=DELETE o ?_method=PUT

app.set('view engine', 'ejs');//  Template Engine - no tocar!


/**
 * Rutas Principales
 */
const mainRouter = require('./routes/mainRoutes');


/**
 * Rutas de usuarios, Ingreso, Registro, edicion de usuarios, Perfil
 */
const usersRoutes = require('./routes/usersRoutes');

/**
 * Rutas de producto, en este caso carteleria, Publicar carteles, editar carteles, listar carteles
 */
const signRoutes = require('./routes/signRoutes');

/**
 * Rutas de APIs
 */
const apiSignsRoutes = require('./routes/api/signApiRoutes');

const apiUsersRoutes = require('./routes/api/userApiRoutes');


/**
 * Utilizacion de rutas
 */
app.use('/', mainRouter);

app.use('/users', usersRoutes);

app.use('/sign', signRoutes);

/**
 * APIs colecciones
 */

 /**
  * Coleccion de recursos para Carteles
  */
app.use('/api/signs', apiSignsRoutes);

/**
 * Coleccion de recursos para Usuarios
 */
app.use('/api/users', apiUsersRoutes);




// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;
