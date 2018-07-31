<template>
  <nav class="level">
    <!-- Left side -->
    <div class="level-left">
      <div class="level-item">
        <control-select
          v-model="search.type"
          label="Eladó / Kiadó"
        >
          <option v-for="option in propertiesMainTypes" :key="option.value" :value="option">{{ $t('properties.'+option) }}</option>
        </control-select>
      </div>
      <div class="level-item">
        <control-select
          v-model="search.propertiesType"
          label="Típus"
        >
          <option v-for="option in propertiesTypes" :key="option.value" :value="option">{{ option }}</option>
        </control-select>
      </div>
    </div>

    <!-- Right side -->
    <div class="level-right">
      <p class="level-item"><strong>All</strong></p>
      <p class="level-item"><a>Published</a></p>
      <p class="level-item"><a>Drafts</a></p>
      <p class="level-item"><a>Deleted</a></p>
      <p class="level-item"><a class="button is-primary" @click.prevent="clickSearch">Search</a></p>
    </div>
  </nav>
</template>
<script>
import ControlSelect from '@/components/form-controls/control-select';
import {
  PROPERTIES_MAIN_TYPES,
  PROPERTY_ONSALE_KEY,
  PROPERTIES_TYPE
} from '../constants';

export default {
  name: 'search',
  components: {
    ControlSelect
  },
  provide() {
    return { parentValidator: this.$validator };
  },
  data() {
    return {
      search: {
        type: PROPERTY_ONSALE_KEY,
        propertiesType: ''
      }
    };
  },
  computed: {
    propertiesMainTypes() {
      return PROPERTIES_MAIN_TYPES;
    },
    propertiesTypes() {
      return PROPERTIES_TYPE;
    }
  },
  methods: {
    clickSearch() {
      this.$emit('search', this.search);
    }
  }
};
</script>
