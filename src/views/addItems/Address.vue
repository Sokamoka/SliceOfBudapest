<template>
  <div>
    <section class="section">
      <h1 class="is-size-3">Cím ({{ step + 1 }}/{{ maxStep }})</h1>
      <div class="columns is-multiline">
        <div class="column is-half">
          <control-input
            label="Város"
            v-model="address.city"
            placeholder="Város"
            name="addressCity"
            v-validate="{required: true}"
          ></control-input>
        </div>

        <div class="column is-half">
          <control-select
            v-model="address.district"
            label="Kerület"
            placeholder="Kérem válassz"
            :disabled="isCapital"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-input
            label="Utca"
            v-model="address.street"
            placeholder="utca"
            name="addressStreet"
            v-validate="{required: true}"
          ></control-input>
        </div>

        <div class="column is-half">
          <control-input
            label="Házszám"
            v-model="address.number"
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
      address: {}
    };
  },
  computed: {
    isCapital() {
      return this.address.city
        ? this.address.city.toLowerCase() !== 'budapest'
        : true;
    }
  },
  created() {
    this.address = this.value ? this.value : {};
  },
  methods: {
    async clickNext() {
      const result = await this.$validator.validate();
      if (result) this.$emit('input', this.address);
    },
    clickPrev() {
      this.$emit('step-prev');
    }
  }
};
</script>
