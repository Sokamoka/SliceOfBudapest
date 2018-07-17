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
            :class="inputClasses"
            v-model="model"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
          >
        </p>
        <p v-if="isSufFixed" class="control">
          <a class="button is-static" v-html="suffix"></a>
        </p>
      </div>
      <p v-if="hasErrors" class="help is-danger">{{ errorMessage }}</p>
      <p v-if="isHelpText" class="help">{{ help }}</p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  $_veeValidate: {
    value() {
      return this.value;
    },

    name() {
      return this.name;
    }
  },
  inject: ['parentValidator'],
  props: {
    value: {
      type: String
    },
    name: {
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
    },
    disabled: {
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
        'has-addons': this.isPreFixed || this.isSufFixed,
        'is-danger': this.hasErrors
      };
    },
    inputClasses() {
      return {
        input: true,
        'is-danger': this.hasErrors
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
    },
    hasErrors() {
      return this.errors ? this.errors.has(this.name) : false;
    },
    errorMessage() {
      return this.errors.first(this.name);
    }
  },
  created() {
    this.$validator = this.parentValidator;
  }
};
</script>
