const express = require('express')
const handlebars = require('express-handlebars').create({defaultLayout:'main', extname: 'hbs'})
const path = require('path')
const config = require('config')

const app = express();

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ redirect: true })); //Добавляє body в request, що дозволяє парсити дані форм по властивості name

app.use('/', require('./routes/cesareanRoute'));

app.listen(config.get('port'), error => { error? (() => {throw new Error("Server was crashing..")})(): console.info(`server has been started on port ${config.get('port')}...`)});