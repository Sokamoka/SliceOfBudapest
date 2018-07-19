<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        {{ item.address }}
        <router-link :to="{ name: 'property', params: { locale: $i18n.locale, id: item['.key'] }}">GO</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object
    }
  }
};
</script>
