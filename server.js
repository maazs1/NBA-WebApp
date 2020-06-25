const express = require('express')
const app = express()
const games = require('./route/NBA_games');
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 const port = process.env.PORT || 3000;

app.use('/api/NBA/Games', games);

app.listen(port, () => console.log(`Server on http://localhost:${port}`));