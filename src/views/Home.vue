<template>
  <div class="home">
    <img src="../assets/logo.png">
    <Login></Login>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Login from "@/components/Login.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Login
  }
};
</script>
