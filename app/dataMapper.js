const client = require('./database');

const dataMapper = {
    getAllPokemons: (callback) => {
        const selectPokemonsQuery = `SELECT numero, nom FROM pokemon;`;

        client.query(selectPokemonsQuery, callback);
    },

    getPokemonsByType: (typeId, callback) => {
        const selectPokemonsByTypeQuery = `
        SELECT numero, nom 
        FROM pokemon JOIN pokemon_type ON pokemon.numero = pokemon_numero 
        WHERE type_id = $1 
        GROUP BY numero, nom;`;

        client.query(selectPokemonsByTypeQuery, [typeId], callback);
    },

    getPokemonByNum: (pokemonNum, callback) => {
         const selectOnePokemonQuery = `
         SELECT pokemon.*, ARRAY_AGG(type_id) as type_ids
         FROM pokemon JOIN pokemon_type ON pokemon.numero = pokemon_numero 
         WHERE numero=$1 
         GROUP BY pokemon.id, nom, pv, attaque, defense, attaque_spe, defense_spe, vitesse, numero;`;

        client.query(selectOnePokemonQuery, [pokemonNum], callback);
    },

    getTypeById: (idsArray, callback) => {
        const selectOneTypeQuery = `
        SELECT name, color, type.id FROM type 
        JOIN pokemon_type ON pokemon_type.type_id = type.id 
        WHERE type.id = ANY($1) 
        GROUP BY name, color, type.id;`;

        client.query(selectOneTypeQuery, [idsArray], callback);
    },

    getAllTypes: (callback) => {
        const selectAllTypesQuery = `SELECT * FROM type;`;

        client.query(selectAllTypesQuery, callback);
    }

};

module.exports = dataMapper;