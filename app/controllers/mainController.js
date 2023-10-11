const dataMapper = require('../dataMapper');

const mainController = {
    homePage: (req, res) => {
        dataMapper.getAllPokemons((err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.render('home', {pokemons: result.rows});
            }
        });
    },

    homePageByType: (req, res) => {
        const typeId = req.params.typeId;
        dataMapper.getPokemonsByType(typeId, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.render('home', {pokemons: result.rows});
            }
        });
    },

    pokemonDetail: (req, res) => {
        const pokemonNum = req.params.pokemonNum;

        dataMapper.getPokemonByNum(pokemonNum, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                const pokemonFromDataBase = result.rows[0];
                dataMapper.getTypeById(pokemonFromDataBase.type_ids, (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.render('detail', {
                            pokemon: pokemonFromDataBase,
                            types: result.rows
                        });
                    }
                });
            };
        });
    },

    typesPage: (req, res) => {
        dataMapper.getAllTypes((err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.render('types', {types: result.rows});
            }
        });
    }
};

module.exports = mainController;