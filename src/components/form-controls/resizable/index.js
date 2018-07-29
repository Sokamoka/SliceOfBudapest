export default {
  props: {
    active: {
      type: Boolean
    }
  },

  methods: {
    resizeTextarea(event) {
      event.target.style.height = 'auto';
      event.target.style.height = event.target.scrollHeight + 'px';
    }
  },

  mounted() {
    if (!this.active) {
      return;
    }
    this.$nextTick(() => {
      this.$el.setAttribute(
        'style',
        'height:' + this.$el.scrollHeight + 'px;overflow-y:hidden;'
      );
    });

    this.$el.addEventListener('input', this.resizeTextarea);
  },

  beforeDestroy() {
    this.$el.removeEventListener('input', this.resizeTextarea);
  },

  render() {
    return this.$slots.default[0];
  }
};
