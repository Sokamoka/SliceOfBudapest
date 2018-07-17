<template>
  <div :class="mainClasses">
  <div v-if="isHorizontal" class="field-label is-normal">
    <label class="label" v-html="label"></label>
  </div>
  <div class="field-body">
    <div class="field is-expanded">
      <label v-if="!isHorizontal" class="label" v-html="label"></label>
      <div class="field">
        <textarea class="textarea" :placeholder="placeholder" :rows="rows"></textarea>
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
    },
    rows: {
      type: Number,
      default: 5
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
