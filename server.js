const express = require('express')
const app = express()
const games = require('./route/NBA_games');
const path = require('path')



var hbs = require('express-handlebars')
app.engine('hbs', hbs({extname: 'hbs', defaultLayout:'layout', layoutsDir: __dirname + '/views/' }));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));



const port = process.env.PORT || 3000;

app.use('/', games);

app.listen(port, () => console.log(`Server on http://localhost:${port}`));