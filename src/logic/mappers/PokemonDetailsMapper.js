export default class PokemonDetailsMapper {
    map(response, result={}) {
        result.name = response.name;
        result.id = response.id;
        result.img = response.sprites.other["official-artwork"].front_default;
        result.types = response.types.map(t => t.type.name);
        result.detailsUrl = "/pokemon/" + response.id;

        return result;
    }

    applyAbility(response, result={}) {
        result.descriptions = response.effect_entries.filter(e => e.language.name === "en").map(e => e.effect);

        return result;
    }
}