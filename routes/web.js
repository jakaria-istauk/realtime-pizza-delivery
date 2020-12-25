const homeController = require('../app/http/controllers/homeController');
const authContoller = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const api = require('laravel-mix');

function initRoutes(app){
    app.get('/', homeController().index)
    app.get('/register', authContoller().register)
    app.post('/register', authContoller().userRegister)
    app.get('/login', authContoller().login)
    app.post('/login', authContoller().userLogin)
    app.post('/logout', authContoller().userLogout)
    

    app.get('/cart', cartController().cart)
    app.post('/update-cart', cartController().update)
}

module.exports = initRoutes;