<template>
  <div>
    <section class="section">
      <h1 class="is-size-3">Leírás ({{ step + 1 }}/{{ maxStep }})</h1>
      <div class="columns">
        <div class="column">
          <control-textarea
            v-model="description"
            placeholder="Leírás"
            :help="descriptionHelpText"
            :rows="10"
            name="message"
            data-vv-as="leírás"
            v-validate="{required: true, min: descriptionLength}"
          ></control-textarea>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="field is-grouped is-grouped-right">
        <p class="control">
          <button
            type="button"
            class="button is-light is-medium"
            @click="clickPrev"
          >
            {{ buttonLabels.prev }}
          </button>
        </p>
        <p class="control">
          <button
            type="button"
            class="button is-success is-medium"
            @click="clickNext"
          >
            {{ buttonLabels.next }}
          </button>
        </p>
      </div>
    </section>
  </div>
</template>
<script>
import { DESCRIPTION_LENGTH } from '@/constants';
import ControlTextarea from '@/components/form-controls/control-textarea';

export default {
  components: {
    ControlTextarea
  },
  provide() {
    return { parentValidator: this.$validator };
  },
  props: {
    value: {
      type: String
    },
    step: {
      type: Number
    },
    maxStep: {
      type: Number
    },
    buttonLabels: {
      type: Object
    }
  },
  data() {
    return {
      description: '',
      descriptionLength: DESCRIPTION_LENGTH
    };
  },
  computed: {
    descriptionHelpText() {
      const remainder = DESCRIPTION_LENGTH - this.description.length;
      return remainder > 0
        ? this.$i18n.t('properties.remaining', [remainder])
        : '';
    }
  },
  created() {
    this.description = this.value ? this.value : '';
  },
  methods: {
    async clickNext() {
      const result = await this.$validator.validate();
      console.log('RESULT:', result);
      if (!result) {
        this.$emit('input', this.description);
        this.$emit('on-complete');
      }
    },
    clickPrev() {
      this.$emit('step-prev');
    }
  }
};
</script>
