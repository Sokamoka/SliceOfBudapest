<template>
  <div>
    <section class="section">
    <h1 class="is-size-3">Alapadatok ({{ currentStep }}/{{ maxStep }})</h1>
      <div class="columns is-multiline">

        <div class="column is-half">
          <control-select
            v-model="properties.type"
            label="Eladó / Kiadó"
          >
            <option value="eladó">Eladó</option>
            <option value="kiadó">Kiadó</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="properties.propertiesType"
            label="Típus"
            placeholder="Kérem válassz"
            name="basePropertiesType"
            v-validate="{required: true}"
          >
            <option v-for="option in propertiesTypes" :key="option.value" :value="option">{{ option }}</option>
          </control-select>
        </div>

        <div v-if="isOnOffer" class="column is-half">
          <control-input
            label="Eladási ár"
            type="number"
            v-model="properties.priceOnOffer"
            placeholder="Eladási ár"
            suffix="milió Ft"
            name="basePriceOnOffer"
            v-validate="{required: true}"
          ></control-input>
        </div>

        <div v-if="!isOnOffer" class="column is-half">
          <control-input
            label="Kiadási ár"
            v-model="properties.priceOnRent"
            type="number"
            placeholder="Kiadási ár"
            suffix="ezer Ft / hó"
            name="basePriceOnRent"
            v-validate="{required: true}"
          ></control-input>
        </div>

        <div class="column is-half">
          <control-input
            label="Méret"
            v-model="properties.size"
            :placeholder="$t('properties.size')"
            :data-vv-as="$t('properties.size')"
            suffix="m<sup>2</sup>"
            type="number"
            name="baseSize"
            v-validate="{required: true}"
          ></control-input>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="field is-grouped is-grouped-right">
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
import { PROPERTIES_TYPE } from '../../constants';
import ControlInput from '@/components/form-controls/control-input';
import ControlSelect from '@/components/form-controls/control-select';

export default {
  components: {
    ControlInput,
    ControlSelect
  },
  provide() {
    return { parentValidator: this.$validator };
  },
  props: {
    value: {
      type: Object
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
      defaults: {
        type: 'eladó',
        propertiesType: ''
      },
      properties: {}
    };
  },
  computed: {
    propertiesTypes() {
      return PROPERTIES_TYPE;
    },
    isOnOffer() {
      return this.properties.type === 'eladó';
    },
    currentStep() {
      return this.step + 1;
    }
  },
  created() {
    this.properties = this.value
      ? this.value
      : Object.assign({}, this.defaults);
  },
  methods: {
    async clickNext() {
      const result = await this.$validator.validate();
      // console.log('RESULT:', result);
      if (result) this.$emit('input', this.properties);
    }
  }
};
</script>
