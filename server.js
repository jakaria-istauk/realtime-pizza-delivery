require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const routes = require('./routes/web')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
 
//database connection
const db_url = process.env.MONGO_DB_URL;
mongoose.connect(db_url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('Database connected........');
}).catch(err=>{
    console.log('Connection Faild......');
})

//session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

//Sessions config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours
}))

app.use(flash())


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