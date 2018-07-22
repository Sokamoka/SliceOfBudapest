<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
          <div class="container">
          <h1 class="title">
              Ingatlan Adatlap
          </h1>
          <h2 class="subtitle">
              Hero subtitle
          </h2>
          </div>
      </div>
    </section>
    <div class="container">
      <section>
        <div class="content">
          <ul>
            <li v-for="item in getProperty" :key="item.id">{{ item }}</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  // data() {
  //   return {
  //     property: {}
  //   };
  // },
  computed: {
    ...mapGetters('properties', ['getProperty'])
    // property() {
    //   return this.$store.getters['properties/getProperty'];
    // }
  },
  created() {
    this.initProperty(this.$route.params.id);
  },
  methods: {
    ...mapActions('properties', ['initProperty'])
  }
};
</script>
