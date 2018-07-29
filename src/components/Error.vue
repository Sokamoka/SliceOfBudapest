<template>
  <transition name="slide-down" mode="in-out">
    <div v-if="isVisible" class="notification is-danger">
      <button class="delete" @click="close"></button>
      {{ onError }}
    </div>
  </transition>
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
    close() {
      this.$emit('close');
    }
  }
};
</script>
