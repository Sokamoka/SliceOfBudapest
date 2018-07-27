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
    <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-8">
          <section class="section-sub">
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
          <section class="section-sub">
            <div class="columns is-multiline details">
              <div
                class="column is-half"
                v-for="(detail, key) in details"
                :key="key"
              >
                <div class="is-flex">
                  <label class="label">{{ $t('details.' + key) }}:</label>
                  <div :class="getDetailsDataClass(detail)">
                    {{ getDetailsData(detail) }}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="section-sub">
            {{ description }}
          </section>
        </div>
        <div class="column is-4">
          <section class="section">
            <nav class="panel">
              <p class="panel-heading">
                Comments
              </p>
              <p class="panel-tabs">
                <a class="is-active">Comment</a>
                <a>Contacts</a>
              </p>
              <a class="panel-block">
                <textarea class="textarea" id="" cols="30" rows="10"></textarea>
              </a>
            </nav>
          </section>
        </div>
      </div>
    </div>
    </section>
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
    ...mapGetters('properties', ['getProperty', 'description']),
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
    },
    getDetailsDataClass(data) {
      const isEmpty = data ? false : true;
      return {
        'is-empty': isEmpty
      };
    }
  }
};
</script>
<style lang="scss">
.details {
  label {
    min-width: 60%;
  }
  .is-empty {
    color: gray;
  }
}
</style>
