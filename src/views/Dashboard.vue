<template>
  <div>
    <section class="section">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tweets</p>
            <p class="title">3,456</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Following</p>
            <p class="title">123</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Followers</p>
            <p class="title">456K</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Likes</p>
            <p class="title">789</p>
          </div>
        </div>
      </nav>
    </section>
    <div v-if="user">
      <h1>Hello USER!</h1>
      <img :src="user.photoURL" width="100"> <br>
      <h3>{{user.displayName}}</h3>
      <p>{{user.email}}</p>
      <button @click="logOut">Log out</button>
      <br><br><br>
      <pre>{{user}}</pre>
    </div>
  </div>
</template>

<script>
import auth from '@/auth';

export default {
  name: 'auth-success',
  computed: {
    user() {
      return this.$store.getters['user/user'];
    }
  },
  methods: {
    logOut() {
      auth.logout();
    }
  }
};
</script>
