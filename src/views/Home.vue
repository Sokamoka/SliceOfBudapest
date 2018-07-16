<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
          <div class="container">
          <h1 class="title">
              Home
          </h1>
          <h2 class="subtitle">
              Hero subtitle
          </h2>
          </div>
      </div>
    </section>
    <section>
      <ul>
        <li v-for="item in getProperties" :key="item.id">
          <div>{{ item.address }}</div>
          <div>
            <router-link :to="{ name: 'property', params: { id: item['.key'] }}">GO</router-link>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
// import Login from '@/components/Login.vue';

export default {
  name: 'home',
  data: () => ({}),
  computed: {
    getProperties() {
      return this.$store.getters['properties/getProperties'];
    }
  }
};
</script>
