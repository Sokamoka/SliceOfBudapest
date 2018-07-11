<template>
  <section>
    <form @submit.prevent="login">
      <div class="columns is-mobile">
        <div class="column is-half is-offset-one-quarter">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="email" placeholder="Email" v-model="user.email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input" type="password" placeholder="Password" v-model="user.password">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button  type="submit" class="button is-success">
                Login
              </button>
              <button 
                type="button"
                class="button"
                @click="logout"
              >Log out</button>
            </p>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>
<script>
import Firebase from 'firebase';
// import store from '../store/';

// Firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     store.dispatch('setUser', user);
//   } else {
//     store.dispatch('setUser', null);
//   }
// });

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    login() {
      Firebase.auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .catch(function(error) {
          const errorCode = error.code;
          const errorMsg = error.message;

          console.log('Msg:', errorMsg, errorCode);
        });
    },
    logout() {}
  }
};
</script>
