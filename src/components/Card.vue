<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="item.images[0]" alt="Placeholder image">
      </figure>
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
      type: Object
    }
  }
};
</script>
