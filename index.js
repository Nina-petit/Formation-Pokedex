require('dotenv').config();

const express = require('express');

// on importe le router
const router = require('./app/router');

// un peu de config
const PORT = process.env.PORT || 5001;

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'app/views');

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static('public'));

// routage !
app.use(router);

// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});