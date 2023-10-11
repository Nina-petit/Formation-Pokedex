const express = require('express');

// on importe nos controllers
const mainController = require('./controllers/mainController');

const router = express.Router();

// page d'accueil
router.get('/', mainController.homePage);

// détail d'une carte
router.get('/card/:pokemonNum', mainController.pokemonDetail);

// page des types
router.get('/types', mainController.typesPage);

// page d'accueil par type
router.get('/types/:typeId', mainController.homePageByType);

// on exporte le router 
module.exports = router;