<template>
  <div class="list">
    <h1>Pokemon List</h1>
    <h2><input type="text" v-model="filterByName" @keyup="filterPokemons"></h2>
    <div class="card-columns">
        <div v-for="item in items" class="card bg-light mb-3" style="width: 13rem;">
            <Pokemon :enpoint=item.url />
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Pokemon from '@/components/Pokemon.vue'

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
    const offset = 0;//Math.floor(Math.random() * Math.floor(100));
    fetch("https://pokeapi.co/api/v2/pokemon?limit=30&offset=" + offset).then((resp) => {
        resp.json().then((obj) => {
            this.items = obj.results;
            this.allPokemons = obj.results.slice();
            fetch(obj.url).then((pokemonResp) => {
                pokemonResp.json().then((pokemonObj) => {
                    this.allPokemons.push({});
                this.resp = obj;
                this.name = obj.name;
                this.id = obj.id;
                this.img = obj.sprites.front_default;
                this.types = obj.types.map(t => t.type.name);
                this.detailsUrl = "/pokemon/" + obj.id;
                });
            });
        });
    });
  },
  methods: {
    filterPokemons() {
      if (this.filterByName === "") {
          this.items = this.allPokemons;
          return;
      }
      this.items = [];
      this.items = this.allPokemons.filter(p => p.name.startsWith(this.filterByName)).slice();
    }
  }
}
</script>
