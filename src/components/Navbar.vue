<template>
  <div class="navigation">
    <nav class="navbar container">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{ name: 'home', params: { locale: $i18n.locale } }">
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
          <router-link class="navbar-item" :to="{ name: 'dashboard', params: { locale: $i18n.locale } }" v-if="isLoggedIn">
            Dashboard
          </router-link>
          <router-link class="navbar-item" :to="{ name: 'home', params: { locale: $i18n.locale } }" v-if="isLoggedIn">
            Properties
          </router-link>
          <router-link class="navbar-item" :to="{name: 'add', params: { locale: $i18n.locale }}" v-if="isLoggedIn">
            Add Item
          </router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable" v-if="isLoggedIn">
            <a class="navbar-link" href="#">
              <avatar
                :username="user.name"
                :src="user.image"
                :size="32"
                background-color="#303030"
              ></avatar>
              {{ user.name }}
            </a>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item" @click.prevent="setLocale('hu')">
                HU
              </a>
              <a class="navbar-item" @click.prevent="setLocale('en')">
                EN
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item" href="#" @click.prevent="logout">
                logout
                <span class="icon is-pulled-right">
                  <i class="fa fa-sign-out"></i>
                </span>
              </a>
            </div>
          </div>
          <a 
            v-if="!isLoggedIn"
            href="#"
            class="navbar-item"
            @click.prevent="login"
          >
            Sign In
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { Validator } from 'vee-validate';
// import auth from '@/auth';
import Avatar from 'vue-avatar';

export default {
  components: {
    Avatar
  },
  data() {
    return {
      isMenuVisible: false
    };
  },
  computed: {
    ...mapState('auth', ['user', 'isLoggedIn'])
  },
  methods: {
    ...mapActions('auth', ['login', 'logout']),
    // logout() {
    //   auth.logout();
    // },
    menuToggle() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    setLocale(locale) {
      this.$i18n.locale = locale;
      Validator.localize(locale);
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
