const express = require('express')
const app = express()
const games = require('./route/NBA_games');

var hbs = require('express-handlebars')
app.engine('hbs', hbs({extname: 'hbs', defaultLayout:'layout', layoutsDir: __dirname + '/views/' }));

app.set('view engine', 'hbs');


 
app.get('/', function (req, res) {
  res.send('NBA')
})
 const port = process.env.PORT || 3000;

app.use('/api/NBA/Games', games);

app.listen(port, () => console.log(`Server on http://localhost:${port}`));