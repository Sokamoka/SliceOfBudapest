<template>
  <div>
    <section class="section">
      <h1 class="is-size-3">További adatok ({{ step + 1 }}/{{ maxStep }})</h1>
      <div class="columns is-multiline">

        <div v-if="!isOnOffer" class="column is-half">
          <control-input
            label="Minimum bérlési idő"
            v-model="details.rooms"
            placeholder="Szobák száma"
            suffix="hónap"
          ></control-input>
        </div>

        <div v-if="!isOnOffer" class="column is-half">
          <control-input
            label="Kaució"
            v-model="details.rooms"
            placeholder="Kaució"
            suffix="hónap"
          ></control-input>
        </div>

        <div class="column is-half">
          <control-input 
            label="Egész szobák"
            type="number"
            v-model="details.rooms"
            placeholder="Szobák száma"
            suffix="szoba"
          ></control-input>
        </div>

        <div class="column is-half">
          <control-input 
            label="Fél szobák"
            type="number"
            v-model="details.halfrooms"
            placeholder="Szobák száma"
            suffix="szoba"
          ></control-input>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.material"
            label="Építőanyag típusa"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.comfort"
            label="Komfort"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Jelenlegi állapot"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Energiatanúsítvány"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Emelet"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Erkély típus"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="WC és Fürdő"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Parkolási lehetőségek"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Belmagasság"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Berendezés"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Gépesítés"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Kertkapcsolatos"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>


        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Generációs"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Kilátás"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Tájolás"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Fürdőszobák száma"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Mellékhelyiségek száma"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-select
            v-model="details.district"
            label="Fűtés"
            placeholder="Kérem válassz"
          >
            <option v-for="n in 23" :key="n" :value="n">{{ n }}.</option>
          </control-select>
        </div>

        <div class="column is-half">
          <control-input 
            label="Építés éve"
            v-model="details.rooms"
            placeholder="Építés éve"
          ></control-input>
        </div>

        <div class="column is-half">
          <control-input 
            label="Épület szintjei"
            type="number"
            v-model="details.rooms"
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
import { PROPERTIES_TYPE } from '@/constants';
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
    propertiesTypes() {
      return PROPERTIES_TYPE;
    }
  },
  created() {
    this.details = this.value ? this.value : {};
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
