import PokemonListMapper from "./mappers/PokemonListMapper";
import PokemonDetailsMapper from "./mappers/PokemonDetailsMapper";

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
        this.getJSON(url).then(listJson => {
            const pokemons = [];
            let noOfPokemons = listJson.results.length;
            const mapper = new PokemonListMapper();
            listJson.results.forEach(pokemon => {
                this.getJSON(pokemon.url).then(pokemon => {
                    pokemons.push(mapper.map(pokemon));
                    if (--noOfPokemons === 0) {
                        promiseResolve(pokemons);
                    }
                });
            });
        });
        return pokemonsPromise;
    }

    buildPokemonDetailsUrl(pokemonId) {
        return this.domain + this.version + "pokemon/" + pokemonId;
    }

    buildPokemonAbilityUrl(pokemonId) {
        return this.domain + this.version + "ability/" + pokemonId;
    }

    getJSON(url) {
        return new Promise(function(resolve) {
            fetch(url).then(resp => {
                resp.json().then(json => resolve(json));
            });
        });
    }
}