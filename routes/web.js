const homeController = require('../app/http/controllers/homeController');
const authContoller = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const api = require('laravel-mix');

function initRoutes(app){
    app.get('/', homeController().index);

    app.get('/cart', cartController().cart)

    app.get('/login', authContoller().login)

    app.get('/register', authContoller().register)

    app.post('/update-cart', cartController().update)
}

module.exports = initRoutes;