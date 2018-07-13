<template>
    <div class="container">
      <section class="hero">
        <div class="hero-body">
            <div class="container">
            <h1 class="title">
                Új ingatlan hozzáadása
            </h1>
            <h2 class="subtitle">
                Hero subtitle
            </h2>
            </div>
        </div>
      </section>
      <section>
        <form @submit.prevent="submitProperty">
          <div class="columns is-mobile">
            <div class="column is-half is-offset-one-quarter">
              <div class="field">
                <label class="label">Address</label>
                <p class="control">
                  <input class="input" type="text" placeholder="Address" v-model="properties.address">
                </p>
              </div>
              <div class="field">
                <label class="label">Price</label>
                <p class="control">
                  <input class="input" type="text" placeholder="Price" v-model="properties.price">
                </p>
              </div>
              <div class="field">
                <label class="label">Area</label>
                <p class="control">
                  <input class="input" type="text" placeholder="Area" v-model="properties.area">
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <button
                    type="submit"
                    class="button is-success"
                  >
                    Save
                  </button>
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
</template>
<script>
import auth from '@/auth';

export default {
  name: 'AddItem',
  data() {
    return {
      properties: {
        address: '',
        price: null,
        area: null
      }
    };
  },
  methods: {
    submitProperty() {
      auth
        .getDB()
        .ref('properties')
        .push(this.properties);
    }
  }
};
</script>
