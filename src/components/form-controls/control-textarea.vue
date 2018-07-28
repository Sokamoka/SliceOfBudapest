<template>
  <div :class="mainClasses">
  <div v-if="isHorizontal" class="field-label is-normal">
    <label class="label" v-html="label"></label>
  </div>
  <div class="field-body">
    <div class="field is-expanded">
      <label v-if="!isHorizontal" class="label" v-html="label"></label>
      <div class="field">
        <div :class="controlClasses">
          <resizable :active="autosize">
            <textarea 
              :class="textareaClasses"
              :placeholder="placeholder"
              :rows="rows"
              :disabled="disabled"
              v-model="model"
              @change="change"
            ></textarea>
          </resizable>
        </div>
      </div>
      <p v-if="hasErrors" class="help is-danger">{{ errorMessage }}</p>
      <p v-if="isHelpText" class="help">{{ help }}</p>
    </div>
  </div>
</div>
</template>
<script>
import Resizable from './resizable';

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
  components: {
    Resizable
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String
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
    },
    autosize: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isLoading: {
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
    controlClasses() {
      return {
        control: true,
        'is-loading': this.isLoading
      };
    },
    textareaClasses() {
      return {
        textarea: true,
        'is-danger': this.hasErrors
      };
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
  },
  methods: {
    change() {
      this.$emit('change', this.model);
    }
  }
};
</script>
