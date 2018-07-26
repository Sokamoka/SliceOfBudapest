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
      <section class="section">
        <h1 class="is-size-3">{{ propertyTitle }}</h1>
      </section>
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
    ...mapGetters('properties', ['getProperty']),
    property() {
      return this.getProperty ? this.getProperty[0] : {};
    },
    propertyTitle() {
      if (this.property) {
        const city = this.property.address.district
          ? this.property.address.district + '. kerület'
          : this.property.address.city;
        return `${city}, ${this.property.address.street}`;
      }
      return '';
    }
  },
  created() {
    this.initProperty(this.$route.params.id);
  },
  methods: {
    ...mapActions('properties', ['initProperty'])
  }
};
</script>
