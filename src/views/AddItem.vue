<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
          <div class="container">
          <h1 class="title">
              {{ $t('titles.add-new-property') }}
          </h1>
          <h2 class="subtitle">
              {{ $t("message.hello") }}
          </h2>
          </div>
      </div>
    </section>
    <div class="container">
      <form @submit.prevent="submitProperty">
        <section class="section">
          <h1 class="is-size-3">Alapadatok</h1>
          <div class="columns is-mobile">
            <div class="column is-half">

              <control-select
                v-model="properties.base.type"
                label="Eladó / Kiadó"
              >
                <option value="eladó">Eladó</option>
                <option value="kiadó">Kiadó</option>
              </control-select>

              <control-select
                v-model="properties.base.propertiesType"
                label="Típus"
                placeholder="Kérem válassz"
                name="basePropertiesType"
                v-validate="{required: true}"
              >
                <option value="">select</option>
                <option v-for="option in propertiesTypes" :key="option.value" :value="option">{{ option }}</option>
              </control-select>
            </div>
            <div class="column is-half">

              <control-input
                v-if="isOnOffer"
                label="Eladási ár"
                type="number"
                v-model="properties.base.priceOnOffer"
                placeholder="Eladási ár"
                suffix="milió Ft"
                name="basePriceOnOffer"
                v-validate="{required: true}"
              ></control-input>

              <control-input
                v-if="!isOnOffer"
                label="Kiadási ár"
                v-model="properties.base.priceOnRent"
                type="number"
                placeholder="Kiadási ár"
                suffix="ezer Ft"
                name="basePriceOnRent"
                v-validate="{required: true}"
              ></control-input>

              <control-input
                label="Méret (m<sup>2</sup>)"
                v-model="properties.base.size"
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
          <h1 class="is-size-3">További adatok</h1>
          <div class="columns is-mobile">
            <div class="column is-half">
              <control-input
                v-if="!isOnOffer"
                label="Minimum bérlési idő"
                v-model="properties.rooms"
                placeholder="Szobák száma"
                suffix="hónap"
              ></control-input>

              <control-input 
                label="Egész szobák"
                v-model="properties.rooms"
                placeholder="Szobák száma"
                suffix="szoba"
              ></control-input>

              <control-input
                label="Méret"
                v-model="properties.area"
                placeholder="Add meg a mértet"
                suffix="m2"
              ></control-input>

              <control-select
                v-model="properties.area"
                label="Sátusz"
                placeholder="Kérem válassz"
                help="Lorem ipsum help text"
              ></control-select>
            </div>

            <div class="column is-half">
              <control-input
                v-if="!isOnOffer"
                label="Kaució"
                v-model="properties.rooms"
                placeholder="Kaució"
                suffix="hónap"
              ></control-input>

              <control-input 
                label="Fél szobák"
                v-model="properties.rooms"
                placeholder="Szobák száma"
                suffix="szoba"
              ></control-input>

              <control-input
                label="Méret"
                v-model="properties.area"
                placeholder="Add meg a mértet"
                suffix="m2"
              ></control-input>

              <control-select
                v-model="properties.area"
                label="Sátusz"
                placeholder="Kérem válassz"
                help="Lorem ipsum help text"
              ></control-select>
            </div>
          </div>
        </section>
        <section class="section">
          <h1 class="is-size-3">Leírás</h1>
          <div class="columns is-mobile">
            <div class="column">
              <control-textarea
                v-model="properties.description"
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

        <section>
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button
                type="submit"
                class="button is-success"
              >
                Submit
              </button>
            </p>
          </div>
        </section>
      </form>
    </div>
  </div>
</template>
<script>
// import Vue from 'vue';
import ControlInput from '../components/form-controls/control-input';
import ControlSelect from '../components/form-controls/control-select';
import ControlTextarea from '../components/form-controls/control-textarea';
import { PROPERTIES_TYPE, DESCRIPTION_LENGTH } from '../constants';
import auth from '@/auth';

export default {
  name: 'AddItem',
  components: {
    ControlInput,
    ControlSelect,
    ControlTextarea
  },
  data() {
    return {
      defaults: {
        base: {
          type: 'eladó'
        },
        description: ''
      },
      properties: {},
      descriptionLength: DESCRIPTION_LENGTH
    };
  },
  provide() {
    return { parentValidator: this.$validator };
  },
  computed: {
    propertiesTypes() {
      return PROPERTIES_TYPE;
    },
    isOnOffer() {
      return this.properties.base.type === 'eladó';
    },
    descriptionHelpText() {
      const remainder = DESCRIPTION_LENGTH - this.properties.description.length;
      return remainder > 0
        ? this.$i18n.t('properties.remaining', [remainder])
        : '';
    }
  },
  created() {
    this.properties = Object.assign({}, this.defaults);
  },
  methods: {
    submitProperty() {
      this.$validator.validate().then(result => {
        if (!result) {
          auth
            .getDB()
            .ref('properties')
            .push(this.properties);
          // this.$store.dispatch('properties/addProperty', this.properties);
          this.properties = Object.assign({}, this.defaults);
        }
      });
    }
  }
};
</script>
