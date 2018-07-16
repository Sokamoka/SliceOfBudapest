<template>
  <div class="container">
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
    <section>
      <div class="content">
        <ul>
          <li v-for="item in property" :key="item['.key']">{{ item }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import auth from '@/auth';

export default {
  // data() {
  //   return {
  //     property: {}
  //   };
  // },
  computed: {
    property() {
      return this.$store.getters['properties/getProperty'];
    }
  },
  created() {
    // console.log(this.$route.params.id);
    // this.property = auth.getDB().ref('properties/' + this.$route.params.id);
    this.$store.dispatch(
      'properties/setPropertyRef',
      auth.getDB().ref(`properties/${this.$route.params.id}`)
    );
  }
};
</script>
