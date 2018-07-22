import { getField, updateField } from 'vuex-map-fields';

const state = {
  property: {
    base: {
      type: 'eladó',
      propertiesType: '',
      priceOnOffer: null,
      priceOnRent: null,
      size: null
    },
    description: ''
  }
};

const getters = {
  property: state => state.property,
  description: state => state.property.description,
  base: state => state.property.base,
  getBaseField(state) {
    return getField(state.property.base);
  }
};

const mutations = {
  description(state, data) {
    state.property['description'] = data.description;
  },
  base(state, data) {
    state.property['base'] = data;
  },
  updateBaseField(state, field) {
    updateField(state.property.base, field);
  }
};

const actions = {
  description({ commit }, data) {
    commit('description', data);
  },
  base({ commit }, data) {
    commit('base', data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
