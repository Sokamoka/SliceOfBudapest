<template>
<div :class="mainClasses">
  <div v-if="isHorizontal" class="field-label is-normal">
    <label class="label" v-html="label"></label>
  </div>
  <div class="field-body">
    <div class="field is-expanded">
      <label v-if="!isHorizontal" class="label" v-html="label"></label>
      <div :class="fieldClasses">
        <p v-if="isPreFixed" class="control">
          <a class="button is-static" v-html="prefix"></a>
        </p>
        <p class="control is-expanded">
          <input
            class="input"
            v-model="model"
            :type="type"
            :placeholder="placeholder"
          >
        </p>
        <p v-if="isSufFixed" class="control">
          <a class="button is-static" v-html="suffix"></a>
        </p>
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
      type: String
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
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
    type: {
      type: String,
      default: 'text'
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
        'is-horizontal': this.isHorizontal
      };
    },
    fieldClasses() {
      return {
        field: true,
        'has-addons': this.isPreFixed || this.isSufFixed
      };
    },
    isPreFixed() {
      return this.prefix.length ? true : false;
    },
    isSufFixed() {
      return this.suffix.length ? true : false;
    },
    isHelpText() {
      return this.help.length ? true : false;
    }
  }
};
</script>
