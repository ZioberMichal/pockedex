<template>
    <div class="card-body">
        <h5 class="card-title">{{name}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">#{{id}}</h6>
        <img :src="img">
        <p class="card-text">
            <span v-for="type in types" class="badge badge-secondary">
                {{ type }}
            </span>
        </p>
        <router-link :to=detailsUrl class="btn btn-secondary">Details</router-link>
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
          resp: null,
          name: null,
          img: null,
          id: null,
          types: [],
          detailsUrl: ""
      }
  },
  mounted() {
      console.log("Pokemon: " + this.enpoint);
    fetch(this.enpoint).then((resp) => {
        resp.json().then((obj) => {
            this.resp = obj;
            this.name = obj.name;
            this.id = obj.id;
            this.img = obj.sprites.front_default;
            this.types = obj.types.map(t => t.type.name);
            this.detailsUrl = "/pokemon/" + obj.id;
        });
    });
  }
}
</script>