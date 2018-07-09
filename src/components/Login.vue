<template>
  <div>
    <form @submit.prevent="login">
      <input type="email" name="email" v-model="user.email">
      <input type="password" name="password" v-model="user.password">
      <button type="submit" >Log In</button>
      <button type="button" @click="logout">Log out</button>
    </form>
  </div>
</template>
<script>
import Firebase from "firebase";

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
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

          console.log("Msg:", errorMsg, errorCode);
        });
    },
    logout() {}
  }
};
</script>
