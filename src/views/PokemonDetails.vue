<template>
<div class="card-group">
    <div class="card bg-light mb-3" style="width: 30rem;">
        <div class="card-body">
            <h2 class="card-title">{{name}}</h2>
            <h6 class="card-subtitle mb-2 text-muted">#{{id}}</h6>
            <img :src="img">
            <p class="card-text">
                <span v-for="type in types" class="badge badge-secondary">
                    {{ type }}
                </span>
            </p>
            <p v-for="desc in descriptions" class="card-text">{{ desc }}</p>
            <div @click="goHome" class="btn btn-secondary">Go home</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Pokemon',
  props: {
    enpoint: String
  },
  data() {
      return {
          name: null,
          img: null,
          id: null,
          types: [],
          detailsUrl: null,
          descriptions: []
      }
  },
  mounted() {
    fetch("https://pokeapi.co/api/v2/pokemon/" + this.$route.params.id).then((resp) => {
        resp.json().then((obj) => {
            this.name = obj.name;
            this.id = obj.id;
            this.img = obj.sprites.other["official-artwork"].front_default;
            this.types = obj.types.map(t => t.type.name);
            this.detailsUrl = "/pokemon/" + obj.id;
        });
    });
    fetch("https://pokeapi.co/api/v2/ability/" + this.$route.params.id).then((resp) => {
    resp.json().then((obj) => {
        this.descriptions = obj.effect_entries
            .filter(e => e.language.name === "en")
            .map(e => e.effect);
    });
    });
  },
  methods: {
    goHome() {
      this.$router.push('/list')
    }
  }
}
</script>