const Product = require('../../models/product')
function homeController(){
    return{
        async index(req, res){
            const pizzas = await Product.find();
            res.render('home', { pizzas:pizzas })
        }
    }
}

module.exports = homeController;