<template>
<div class="card-group">
    <div class="card bg-light mb-3" style="width: 30rem;">
        <div class="card-body">
            <h2 class="card-title">{{data.name}}</h2>
            <h6 class="card-subtitle mb-2 text-muted">#{{data.id}}</h6>
            <img :src="data.img">
            <p class="card-text">
                <span v-for="type in data.types" class="badge badge-secondary">
                    {{ type }}
                </span>
            </p>
            <p v-for="desc in data.descriptions" class="card-text">{{ desc }}</p>
            <div @click="redirectToList" class="btn btn-secondary">Go home</div>
        </div>
    </div>
</div>
</template>

<script>
import PokemonDetailsMapper from '../logic/mappers/PokemonDetailsMapper'
import PokemonApi from '../logic/PokemonApi'

export default {
  name: 'PokemonDetails',
  data() {
      return {
          data: {}
      }
  },
  mounted() {
    const pokemonId = this.$route.params.id;
    const mapper = new PokemonDetailsMapper();
    const pokemonApi = new PokemonApi();
    const result = {};
    pokemonApi.getJSON(pokemonApi.buildPokemonDetailsUrl(pokemonId))
      .then(pokemon => mapper.map(pokemon, result))
      .then(mapped => pokemonApi.getJSON(pokemonApi.buildPokemonAbilityUrl(pokemonId)))
      .then(ability => mapper.applyAbility(ability, result))
      .then(data => {
        this.data = data
      });
  },
  methods: {
    redirectToList() {
      this.$router.push('/list')
    }
  }
}
</script>