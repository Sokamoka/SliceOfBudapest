<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
              {{ $t('titles.dashboard') }}
          </h1>
          <h2 class="subtitle">
              {{ $t('menu.dashboard') }}
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Ingatlan</p>
              <p class="title">{{ getPropertiesCount }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Eladó</p>
              <p class="title">{{ getOnSaleCount }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Kiadó</p>
              <p class="title">{{ getOnRentCount }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Kollekció</p>
              <p class="title">456K</p>
            </div>
          </div>
        </nav>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <nav class="level">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <p class="control">
                  <input class="input" type="text" placeholder="Find a post">
              </p>
            </div>
            <div class="level-item">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Find a post">
                </p>
                <p class="control">
                  <button class="button">
                    Search
                  </button>
                </p>
              </div>
            </div>
          </div>

          <!-- Right side -->
          <div class="level-right">
            <p class="level-item"><strong>All</strong></p>
            <p class="level-item"><a>Published</a></p>
            <p class="level-item"><a>Drafts</a></p>
            <p class="level-item"><a>Deleted</a></p>
            <p class="level-item"><a class="button is-success">New</a></p>
          </div>
        </nav>
      </div>
    </section>
    <section>
      <div class="container">
        <div v-if="user">
          <h1>Hello USER!</h1>
          <img :src="user.image" width="100"> <br>
          <h3>{{user.name}}</h3>
          <br><br>
          <pre>{{user}}</pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'auth-success',
  computed: {
    ...mapGetters('properties', [
      'getPropertiesCount',
      'getOnRentCount',
      'getOnSaleCount'
    ]),
    user() {
      return this.$store.getters['auth/user'];
    }
  },
  created() {
    this.propertiesCount();
    this.propertiesCategoryCount('sale');
    this.propertiesCategoryCount('rent');
  },
  methods: mapActions('properties', [
    'propertiesCount',
    'propertiesCategoryCount'
  ])
};
</script>
