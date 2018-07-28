<template>
  <div class="card">
    <div class="card-image">
       <router-link :to="{ name: 'property', params: { locale: $i18n.locale, id: item.id }}">
        <clazy-load
          class="image is-4by3"
          tag="figure"
          :ratio="0.2"
          :threshold="[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]"
          :src="image">
          <img :src="image" slot="image">
          <img src="@/assets/placeholder.png" slot="placeholder">
        </clazy-load>
      </router-link>
    </div>
    <div class="card-content">
      <div class="content">
        {{ item.address.city }}, {{ item.address.street }}
        <router-link :to="{ name: 'property', params: { locale: $i18n.locale, id: item.id }}">GO</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    image() {
      return this.item.images[0] ? this.item.images[0] : '';
    }
  }
};
</script>
<style lang="scss">
figure.image {
  &.loaded {
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    animation-duration: 0.3s;
  }
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
