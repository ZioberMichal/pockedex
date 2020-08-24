<template>
    <div class="card-body">
        <h5 class="card-title">{{data.name}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">#{{data.id}}</h6>
        <img :src="data.img">
        <p class="card-text">
            <span v-for="type in data.types" class="badge badge-secondary">
                {{ type }}
            </span>
        </p>
        <router-link :to=data.detailsUrl class="btn btn-secondary">Details</router-link>
    </div>
</template>

<script>
export default {
  name: 'Pokemon',
  props: {
    data: Object
  }
}
</script>