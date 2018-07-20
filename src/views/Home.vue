<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
          <div class="container">
          <h1 class="title">
              {{ $t('titles.properties') }}
          </h1>
          <h2 class="subtitle">
              {{ $t("message.hello") }}
          </h2>
          </div>
      </div>
    </section>
    <div class="container">
      <section class="section">
        <div class="collections">
          <div class="columns is-multiline">
            <div
              class="column is-3"
              v-for="item in properties"
              :key="item['.key']"
            >
              <card :item="item"></card>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex';
import Card from '@/components/Card.vue';

export default {
  name: 'home',
  components: {
    Card
  },
  data: () => ({}),
  computed: {
    ...mapState('properties', ['properties'])
  },
  mounted() {
    this.init();
  },
  methods: mapActions('properties', ['init'])
};
</script>
