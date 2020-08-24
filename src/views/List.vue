<template>
  <div class="list">
    <h1>Pokemon List</h1>
    <h2><input type="text" v-model="filterByName" @keyup="filterPokemons"></h2>
    <div class="card-columns">
        <div v-for="item in items" class="card bg-light mb-3" style="width: 13rem;">
            <Pokemon :data=item />
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Pokemon from '@/components/Pokemon.vue'
import PokemonApi from '../logic/PokemonApi'

export default {
  name: 'List',
  components: {
    Pokemon
  },
  data() {
    return {
      items: [],
      allPokemons: [],
      filterByName: ""
    }
  },
  mounted() {
    const pokemonApi = new PokemonApi();
    pokemonApi.listPokemons().then(pokemons => {
        this.items = pokemons;
        this.allPokemons = pokemons;
    });
  },
  computed() {
    const sortFun = function(p0, p1) {
        return p0.id - p1.id;
    }
    this.items = this.items.sort(sortFun);
    this.allPokemons = this.allPokemons.sort(sortFun);
  },
  methods: {
    filterPokemons() {
      if (this.filterByName === "") {
          this.items = this.allPokemons;
          return;
      }

      this.items = this.allPokemons.filter(p => p.name.startsWith(this.filterByName));
    }
  }
}
</script>