export default class PokemonListMapper {
    map(response, result={}) {
        result.name = response.name;
        result.id = response.id;
        result.img = response.sprites.front_default;
        result.types = response.types.map(t => t.type.name);
        result.detailsUrl = "/pokemon/" + response.id;
        
        return result;
    }
}