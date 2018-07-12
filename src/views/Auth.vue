<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
          <div class="container">
          <h1 class="title">
              Sign in
          </h1>
          <h2 class="subtitle">
              Hero subtitle
          </h2>
          </div>
      </div>
    </section>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import auth from '@/auth';

export default {
  name: 'auth',
  mounted() {
    auth.authForm('#firebaseui-auth-container');
  }
};
</script>
