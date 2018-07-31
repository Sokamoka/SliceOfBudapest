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
        <search @search="searchQuery"></search>
        <ul>
          <li v-for="(result, index) in searchResult" :key="index">({{ index+1 }}) {{ result.address.city }}, {{ result.base.propertiesType }}</li>
        </ul>
        <div v-if="moreButtonVisible" class="flex">
          <a href="#" class="button is-light" @click.prevent="loadMore">more</a>
        </div>
      </div>
    </section>
    <!-- <section>
      <div class="container">
        <div v-if="user">
          <h1>Hello USER!</h1>
          <img :src="user.image" width="100"> <br>
          <h3>{{user.name}}</h3>
          <br><br>
          <pre>{{user}}</pre>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Search from '@/components/Search';
import db from '@/firebase/db';

export default {
  name: 'Dashboard',
  components: {
    Search
  },
  computed: {
    ...mapGetters('properties', [
      'getPropertiesCount',
      'getOnRentCount',
      'getOnSaleCount',
      'searchResult',
      'paging'
    ]),
    user() {
      return this.$store.getters['auth/user'];
    },
    moreButtonVisible() {
      return !!this.searchResult.length && !this.paging.end;
    }
  },
  created() {
    this.propertiesCount();
    this.propertiesCategoryCount('sale');
    this.propertiesCategoryCount('rent');
  },
  methods: {
    ...mapActions('properties', [
      'propertiesCount',
      'propertiesCategoryCount',
      'search',
      'loadMore'
    ]),
    searchQuery(query) {
      const ref = db
        .collection('properties')
        .where('base.type', '==', query.type)
        .where('base.propertiesType', '==', query.propertiesType);

      this.search(ref);
    }
  }
};
</script>
