<template>
  <div v-if="isVisible" class="notification is-danger">
    <!-- <button class="delete"></button> -->
    {{ onError }}
  </div>
</template>
<script>
export default {
  props: {
    onError: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      errorMessage: this.onError
    };
  },
  computed: {
    isVisible() {
      return this.onError.length;
    }
  },
  methods: {
    close() {}
  }
};
</script>
