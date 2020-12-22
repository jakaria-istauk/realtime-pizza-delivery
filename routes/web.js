const homeController = require('../app/http/controllers/homeController');
const authContoller = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController')

function initRoutes(app){
    app.get('/', homeController().index);

    app.get('/cart', cartController().cart)

    app.get('/login', authContoller().login)

    app.get('/register', authContoller().register)
}

module.exports = initRoutes;