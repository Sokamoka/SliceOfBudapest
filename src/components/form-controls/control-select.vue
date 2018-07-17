<template>
  <div :class="mainClasses">
  <div v-if="isHorizontal" class="field-label is-normal">
    <label class="label" v-html="label"></label>
  </div>
  <div class="field-body">
    <div class="field is-expanded">
      <label v-if="!isHorizontal" class="label" v-html="label"></label>
      <div class="field">
        <div class="select">
          <select v-model="model">
            <option v-if="placeholder.length" value="" disabled>{{ placeholder }}</option>
            <slot></slot>
          </select>
        </div>
      </div>
      <p v-if="isHelpText" class="help">{{ help }}</p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    help: {
      type: String,
      default: ''
    },
    isHorizontal: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    mainClasses() {
      return {
        field: true,
        'is-control-select': true,
        'is-horizontal': this.isHorizontal
      };
    },
    isHelpText() {
      return this.help.length ? true : false;
    }
  }
};
</script>
<style lang="scss">
.is-control-select {
  .field {
    &.is-expanded {
      width: 100%;

      select,
      .select {
        width: 100%;
      }
    }
  }
}
</style>
