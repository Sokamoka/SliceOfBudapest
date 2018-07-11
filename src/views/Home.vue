<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
          <div class="container">
          <h1 class="title">
              Home
          </h1>
          <h2 class="subtitle">
              Hero subtitle
          </h2>
          </div>
      </div>
    </section>
    <Login></Login>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';

export default {
  name: 'home',
  components: {
    Login
  }
};
</script>
