<template>
  <div>
    <section class="section">
      <h1 class="is-size-3">Cím ({{ step + 1 }}/{{ maxStep }})</h1>
      <div class="columns is-multiline">
        <div class="column is-half">
          <control-input
            label="Város"
            v-model="city"
            placeholder="Város"
            name="addressCity"
            v-validate="{required: true}"
          ></control-input>
        </div>

        <div class="column is-half">
          <control-select
            v-model="district"
            label="Kerület"
            placeholder="Kérem válassz"
            :disabled="isCapital"
            name="addressDistrict"
            v-validate="{required: true}"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-input
            label="Utca"
            v-model="street"
            placeholder="utca"
            name="addressStreet"
            v-validate="{required: true}"
          ></control-input>
        </div>

        <div class="column is-half">
          <control-input
            label="Házszám"
            v-model="number"
            placeholder="Házszám"
          ></control-input>
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
            <span class="icon is-small">
              <i class="fas fa-arrow-left"></i>
            </span>
            <span>{{ buttonLabels.prev }}</span>
          </button>
        </p>
        <p class="control">
          <button
            type="button"
            class="button is-primary is-medium"
            @click="clickNext"
          >
            <span>{{ buttonLabels.next }}</span>
            <span class="icon is-small">
              <i class="fas fa-arrow-right"></i>
            </span>
          </button>
        </p>
      </div>
    </section>
  </div>
</template>
<script>
import { createHelpers } from 'vuex-map-fields';
import ControlInput from '@/components/form-controls/control-input';
import ControlSelect from '@/components/form-controls/control-select';

const { mapFields } = createHelpers({
  getterType: 'getAddressField',
  mutationType: 'updateAddressField'
});

export default {
  components: {
    ControlInput,
    ControlSelect
  },
  provide() {
    return { parentValidator: this.$validator };
  },
  props: {
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
  computed: {
    ...mapFields('property', ['city', 'district', 'street', 'number']),
    isCapital() {
      return this.city.toLowerCase() !== 'budapest';
    }
  },
  methods: {
    async clickNext() {
      const result = await this.$validator.validate();
      if (!result) this.$emit('step-next');
    },
    clickPrev() {
      this.$emit('step-prev');
    }
  }
};
</script>
