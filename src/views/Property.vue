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
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {{ propertyTitle }}
            </p>
          </header>
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="mainImageSrc" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          v-for="(detail, key) in details"
          :key="key"
        >
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">{{ key }}</label>
            </div>
            <div class="field-body">
              <div class="field">
                {{ getDetailsData(detail) }}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        {{ description }}
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
      return this.getProperty ? this.getProperty[0] : null;
    },
    propertyTitle() {
      if (this.property) {
        const city = this.property.address.district
          ? this.property.address.district + '. kerület'
          : this.property.address.city;
        return `${city}, ${this.property.address.street}`;
      }
      return '';
    },
    mainImageSrc() {
      return this.property ? this.property.images[0] : '';
    },
    description() {
      return this.property ? this.property.description : '';
    },
    details() {
      return this.property ? this.property.details : {};
    }
  },
  created() {
    this.initProperty(this.$route.params.id);
  },
  methods: {
    ...mapActions('properties', ['initProperty']),
    getDetailsData(data) {
      return data ? data : 'nincs adat';
    }
  }
};
</script>
