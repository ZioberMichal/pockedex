<template>
  <div class="list">
    <h1>
      <div v-if="prev" @click="prevPage" class="btn btn-secondary">&lt;&lt;</div>
      Pokemon List
      <div v-if="next" @click="nextPage" class="btn btn-secondary">&gt;&gt;</div>
    </h1>
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
      filterByName: "",
      prev: false,
      next: false
    }
  },
  mounted() {
    const pageSize = 30;
    const offset = Math.max(this.$route.params.offset || 0, 0) * pageSize;
    const pokemonApi = new PokemonApi();
    pokemonApi.listPokemons(pageSize, offset).then(pokemons => {
        this.items = pokemons;
        this.allPokemons = pokemons;
    });
    this.prev = offset > 0;
    this.next = offset < 1000;
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
    },

    prevPage() {
      const offset = Math.max(this.$route.params.offset || 0, 0) - 1;
      this.$router.push('/list/' + offset)
    },

    nextPage() {
      const offset = Math.max(this.$route.params.offset || 0, 0) + 1;
      this.$router.push('/list/' + offset)
    }
  }
}
</script>