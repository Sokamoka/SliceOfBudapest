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
          <div class="columns is-multiline">

            <div class="column is-half">
              <control-select
                v-model="properties.base.type"
                label="Eladó / Kiadó"
              >
                <option value="eladó">Eladó</option>
                <option value="kiadó">Kiadó</option>
              </control-select>
            </div>

            <div class="column is-half">
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

            <div v-if="isOnOffer" class="column is-half">
              <control-input
                label="Eladási ár"
                type="number"
                v-model="properties.base.priceOnOffer"
                placeholder="Eladási ár"
                suffix="milió Ft"
                name="basePriceOnOffer"
                v-validate="{required: true}"
              ></control-input>
            </div>

            <div v-if="!isOnOffer" class="column is-half">
              <control-input
                label="Kiadási ár"
                v-model="properties.base.priceOnRent"
                type="number"
                placeholder="Kiadási ár"
                suffix="ezer Ft"
                name="basePriceOnRent"
                v-validate="{required: true}"
              ></control-input>
            </div>

            <div class="column is-half">
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
          <h1 class="is-size-3">Cím</h1>
          <div class="columns is-multiline">
            <div class="column is-half">
              <control-input
                label="Város"
                v-model="properties.address.city"
                placeholder="Város"
                name="addressCity"
                v-validate="{required: true}"
              ></control-input>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Kerület"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-input
                label="Utca"
                v-model="properties.address.street"
                placeholder="utca"
                name="addressStreet"
                v-validate="{required: true}"
              ></control-input>
            </div>

            <div class="column is-half">
              <control-input
                label="Házszám"
                v-model="properties.address.number"
                placeholder="Házszám"
              ></control-input>
            </div>
          </div>
        </section>
        <section class="section">
          <h1 class="is-size-3">További adatok</h1>
          <div class="columns is-multiline">

            <div v-if="!isOnOffer" class="column is-half">
              <control-input
                label="Minimum bérlési idő"
                v-model="properties.rooms"
                placeholder="Szobák száma"
                suffix="hónap"
              ></control-input>
            </div>

            <div v-if="!isOnOffer" class="column is-half">
              <control-input
                label="Kaució"
                v-model="properties.rooms"
                placeholder="Kaució"
                suffix="hónap"
              ></control-input>
            </div>

            <div class="column is-half">
              <control-input 
                label="Egész szobák"
                type="number"
                v-model="properties.data.rooms"
                placeholder="Szobák száma"
                suffix="szoba"
              ></control-input>
            </div>

            <div class="column is-half">
              <control-input 
                label="Fél szobák"
                type="number"
                v-model="properties.data.halfrooms"
                placeholder="Szobák száma"
                suffix="szoba"
              ></control-input>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.data.material"
                label="Építőanyag típusa"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.data.comfort"
                label="Komfort"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Jelenlegi állapot"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Energiatanúsítvány"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Emelet"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Erkély típus"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="WC és Fürdő"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Parkolási lehetőségek"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Belmagasság"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Berendezés"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Gépesítés"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Kertkapcsolatos"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>


            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Generációs"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Kilátás"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Tájolás"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Fürdőszobák száma"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Mellékhelyiségek száma"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-select
                v-model="properties.address.district"
                label="Fűtés"
                placeholder="Kérem válassz"
              >
                <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
              </control-select>
            </div>

            <div class="column is-half">
              <control-input 
                label="Építés éve"
                v-model="properties.rooms"
                placeholder="Építés éve"
              ></control-input>
            </div>

            <div class="column is-half">
              <control-input 
                label="Épület szintjei"
                type="number"
                v-model="properties.rooms"
                placeholder="Épület szintjei"
                suffix="emelet"
              ></control-input>
            </div>

          </div>
        </section>
        <section class="section">
          <h1 class="is-size-3">Leírás</h1>
          <div class="columns">
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

        <section class="section">
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button
                type="submit"
                class="button is-success is-medium"
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
import { mapState } from 'vuex';
import ControlInput from '../components/form-controls/control-input';
import ControlSelect from '../components/form-controls/control-select';
import ControlTextarea from '../components/form-controls/control-textarea';
import { PROPERTIES_TYPE, DESCRIPTION_LENGTH } from '../constants';
import db from '@/firebase/db';

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
        address: {},
        data: {},
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
    ...mapState('auth', ['user']),
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
        if (result) {
          console.log('VALID!');
          db.collection('properties')
            .doc(this.user.id)
            .set(this.properties);
          this.properties = Object.assign({}, this.defaults);
          this.$validator.reset();
        }
      });
    }
  }
};
</script>
