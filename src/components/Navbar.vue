<template>
  <div class="navigation">
    <nav class="navbar container">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{ name: 'home' }">
          Slice Of Budapest
        </router-link>
        <div :class="{ 'navbar-burger burger': true, 'is-active': isMenuVisible }" data-target="navbarTop" @click="menuToggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarTop" :class="{ 'navbar-menu': true, 'is-active': isMenuVisible }">
        <div class="navbar-start">
          <router-link class="navbar-item" :to="{ name: 'home' }">
            List
          </router-link>
          <router-link class="navbar-item" to="/add">
            Add Item
          </router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link class="navbar-link" :to="{ name: 'Profile', params: { list: 'projects' }}" v-show="isLoggedIn">
              AAX
            </router-link>
            <div class="navbar-dropdown is-boxed">
              <router-link class="navbar-item" :to="{ name: 'Profile', params: { list: 'projects' }}">
                adad
              </router-link>
              <router-link class="navbar-item" :to="{ name: 'Settings' }">
                qweqwe
              </router-link>
              <hr class="navbar-divider">
              <a class="navbar-item" href="#" @click.prevent="logout">
                logout
                <span class="icon is-pulled-right">
                  <i class="fa fa-sign-out"></i>
                </span>
              </a>
            </div>
          </div>
          <router-link class="navbar-item" :to="{ name: 'Login' }" v-show="!isLoggedIn">
            Login
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
// import Avatar from 'vue-avatar'

export default {
  components: {
    // Avatar
  },
  data() {
    return {
      isMenuVisible: false
    };
  },
  computed: {
    isLoggedIn() {
      return true;
    }
  },
  methods: {
    logout() {},
    menuToggle() {
      this.isMenuVisible = !this.isMenuVisible;
    }
  }
};
</script>
<style scoped lang="scss">
.navigation {
  background-color: #fff;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
  min-width: 100%;
  position: fixed;
  top: 0;
  z-index: 1024;
}

.navbar-brand {
  font-family: "Abel", sans-serif;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;

  .navbar-item {
    padding-bottom: 5px;
    padding-top: 5px;
  }
}

.vue-avatar--wrapper {
  display: inline-block;
  margin-right: 5px;
}
</style>
