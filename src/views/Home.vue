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
    <section class="section">
      <div class="container">
        <div class="collections">
          <error :on-error="onError"></error>
          <div v-if="!isLoading" class="columns is-multiline">
            <div
              class="column is-3"
              v-for="item in properties"
              :key="item.id"
            >
              <card :item="item"></card>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters, mapActions } from 'vuex';
import Card from '@/components/Card.vue';
import Error from '@/components/Error.vue';

export default {
  name: 'home',
  components: {
    Card,
    Error
  },
  data: () => ({}),
  computed: {
    ...mapState('properties', ['properties']),
    ...mapGetters('properties', ['isLoading', 'onError'])
  },
  mounted() {
    this.init();
  },
  methods: mapActions('properties', ['init'])
};
</script>
