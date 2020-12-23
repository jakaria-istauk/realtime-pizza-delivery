const express = require('express');
const app = express();
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const routes = require('./routes/web')
const mongoose = require('mongoose')

//database connection
const db_url = 'mongodb://localhost/pizza';
mongoose.connect(db_url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('Database connected........');
}).catch(err=>{
    console.log('Connection Faild......');
})

const PORT = process.env.PORT || 3000

//assets

app.use(express.static('public'))

//set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

//require routes
routes(app)

app.listen(PORT, () => {
    console.log('listenig on port '+PORT);
})