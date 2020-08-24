export default class PokemonApi {
    constructor() {
        this.domain = "https://pokeapi.co/";
        this.version = "api/v2/"
    }

    buildListPokemonsUrl(limit=30, offset=0) {
        return this.domain + this.version + `pokemon?limit=${limit}&offset=${offset}`;
    }

    listPokemons(limit=30, offset=0) {
        const url = this.buildListPokemonsUrl(limit, offset);
        
        let promiseResolve;
        const pokemonsPromise = new Promise(function(resolve) { promiseResolve = resolve; });
        fetch(url).then(listResp => {
            listResp.json().then(listJson => {
                const pokemons = [];
                let noOfPokemons = listJson.results.length;
                listJson.results.forEach(pokemon => {
                    fetch(pokemon.url).then(pokemonResp => {
                        pokemonResp.json().then(pokemon => {
                            pokemons.push({
                                rest: pokemon,
                                name: pokemon.name,
                                id: pokemon.id,
                                img: pokemon.sprites.front_default,
                                types: pokemon.types.map(t => t.type.name),
                                detailsUrl: "/pokemon/" + pokemon.id
                            });
                            if (--noOfPokemons === 0) {
                                promiseResolve(pokemons);
                            }
                        });
                    });
                });
            });
        });
        return pokemonsPromise;
    }
}