<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
    <page-footer></page-footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import pageFooter from './components/Footer.vue';
import auth from '@/auth';

export default {
  name: 'app',
  components: {
    Navbar,
    pageFooter
  },
  created() {
    this.$store.dispatch(
      'properties/setPropertiesRef',
      auth.getDB().ref('properties')
    );
  }
};
</script>


<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
