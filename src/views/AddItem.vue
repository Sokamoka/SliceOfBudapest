<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
          <div class="container">
          <h1 class="title">
              Új ingatlan hozzáadása
          </h1>
          <h2 class="subtitle">
              Hero subtitle
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
              >
                <option v-for="option in propertiesTypes" :key="option.value" :value="option">{{ option }}</option>
              </control-select>
            </div>
            <div class="column is-half">

              <control-input
                v-if="isOnOffer"
                label="Eladási ár"
                v-model="properties.base.price"
                placeholder="Eladási ár"
                suffix="milió Ft"
              ></control-input>

              <control-input
                v-if="!isOnOffer"
                label="Kiadási ár"
                v-model="properties.base.price"
                placeholder="Kiadási ár"
                suffix="ezer Ft"
              ></control-input>

              <control-input
                label="Méret (m<sup>2</sup>)"
                v-model="properties.base.size"
                placeholder="Méret"
                suffix="m<sup>2</sup>"
                type="number"
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
                :options="selectOptions"
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
                :options="selectOptions"
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
                v-model="properties.message"
                placeholder="Leírás"
                help="Minimum 250 karakter"
                :rows="10"
              ></control-textarea>
            </div>
          </div>
        </section>
        <section>

          <div class="field">
            <p class="control">
              <button
                type="submit"
                class="button is-success"
              >
                Save
              </button>
            </p>
          </div>
        </section>
      </form>
    </div>
  </div>
</template>
<script>
import ControlInput from '../components/form-controls/control-input';
import ControlSelect from '../components/form-controls/control-select';
import ControlTextarea from '../components/form-controls/control-textarea';
import { propertiesType } from '../constants';
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
        }
      },
      properties: {},
      selectOptions: [
        {
          name: 'asdasdasd',
          value: 'a'
        },
        {
          name: 'bsdasdasd',
          value: 'b'
        }
      ]
    };
  },
  computed: {
    propertiesTypes() {
      return propertiesType;
    },
    isOnOffer() {
      return this.properties.type === 'eladó';
    }
  },
  created() {
    this.properties = Object.assign({}, this.defaults);
  },
  methods: {
    submitProperty() {
      auth
        .getDB()
        .ref('properties')
        .push(this.properties);
      // this.$store.dispatch('properties/addProperty', this.properties);
      this.properties = {};
    }
  }
};
</script>
