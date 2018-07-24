<template>
  <div>
    <section class="section">
      <h1 class="is-size-3">További adatok ({{ step + 1 }}/{{ maxStep }})</h1>
      <div class="columns is-multiline">

        <div v-if="!isOnOffer" class="column is-half">
          <control-input
            label="Minimum bérlési idő"
            type="number"
            v-model="minRentTime"
            placeholder="Időtartam"
            suffix="hónap"
          ></control-input>
        </div>

        <div v-if="!isOnOffer" class="column is-half">
          <control-input
            label="Kaució"
            type="number"
            v-model="cautions"
            placeholder="Kaució"
            suffix="hónap"
          ></control-input>
        </div>

        <div class="column is-half">
          <control-input 
            label="Egész szobák"
            type="number"
            v-model="rooms"
            placeholder="Szobák száma"
            suffix="szoba"
          ></control-input>
        </div>

        <div class="column is-half">
          <control-input 
            label="Fél szobák"
            type="number"
            v-model="halfrooms"
            placeholder="Szobák száma"
            suffix="szoba"
          ></control-input>
        </div>

        <div class="column is-half">
          <control-input 
            label="Telek mérete"
            type="number"
            v-model="groundSize"
            placeholder="Telek mérete"
            suffix="m2"
          ></control-input>
        </div>

        <div class="column is-half">
          <control-select
            v-model="material"
            label="Építőanyag típusa"
            placeholder="Kérem válassz"
          >
            <option v-for="types in materialTypes" :key="types" :value="types">{{ types }}</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="comfort"
            label="Komfort"
            placeholder="Kérem válassz"
          >
            <option v-for="type in comfortTypes" :key="type" :value="type">{{ type }}</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="condition"
            label="Jelenlegi állapot"
            placeholder="Kérem válassz"
          >
            <option v-for="type in conditionTypes" :key="type" :value="type">{{ type }}</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="energy"
            label="Energiatanúsítvány"
            placeholder="Kérem válassz"
          >
            <option v-for="type in energyTypes" :key="type" :value="type">{{ type }}</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="floor"
            label="Emelet"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="elevator"
            label="Lift"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="balcony"
            label="Erkély típus"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="toiletWithBath"
            label="WC és Fürdő"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="parking"
            label="Parkolási lehetőségek"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="innerHeight"
            label="Belmagasság"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="furnishing"
            label="Berendezés"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="machinery"
            label="Gépesítés"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="garden"
            label="Kertkapcsolatos"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>


        <div class="column is-half">
          <control-select
            v-model="generation"
            label="Generációs"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="views"
            label="Kilátás"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="direction"
            label="Tájolás"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="noBaths"
            label="Fürdőszobák száma"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="noToilets"
            label="Mellékhelyiségek száma"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="heating"
            label="Fűtés"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-input 
            label="Építés éve"
            type="number"
            v-model="built"
            placeholder="Építés éve"
          ></control-input>
        </div>

        <div class="column is-half">
          <control-input 
            label="Épület szintjei"
            type="number"
            v-model="buildingLevels"
            placeholder="Épület szintjei"
            suffix="emelet"
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
import { mapGetters } from 'vuex';
import { createHelpers } from 'vuex-map-fields';
import {
  PROPERTY_MATERIAL_TYPE,
  PROPERTY_CONFORTS,
  PROPERTY_CONDITIONS,
  PROPERTY_ENERGY
} from '../../constants';
import ControlInput from '@/components/form-controls/control-input';
import ControlSelect from '@/components/form-controls/control-select';

const { mapFields } = createHelpers({
  getterType: 'getDetailsField',
  mutationType: 'updateDetailsField'
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
  data() {
    return {};
  },
  computed: {
    ...mapGetters('property', ['isOnOffer']),
    ...mapFields('property', [
      'minRentTime',
      'cautions',
      'rooms',
      'halfrooms',
      'material',
      'comfort',
      'condition',
      'energy',
      'floor',
      'elevator',
      'balcony',
      'toiletWithBath',
      'parking',
      'innerHeight',
      'furnishing',
      'machinery',
      'garden',
      'generation',
      'views',
      'direction',
      'noBaths',
      'noToilets',
      'heating',
      'built',
      'buildingLevels',
      'groundSize'
    ]),
    materialTypes() {
      return PROPERTY_MATERIAL_TYPE;
    },
    comfortTypes() {
      return PROPERTY_CONFORTS;
    },
    conditionTypes() {
      return PROPERTY_CONDITIONS;
    },
    energyTypes() {
      return PROPERTY_ENERGY;
    }
  },
  methods: {
    async clickNext() {
      const result = await this.$validator.validate();
      // console.log('RESULT:', result);
      if (result) this.$emit('step-next');
    },
    clickPrev() {
      this.$emit('step-prev');
    }
  }
};
</script>
