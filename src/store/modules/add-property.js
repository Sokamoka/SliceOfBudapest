import { getField, updateField } from 'vuex-map-fields';

const getDefaultState = () => {
  return {
    property: {
      base: {
        type: 'eladó',
        propertiesType: '',
        priceOnOffer: null,
        priceOnRent: null,
        size: null
      },
      address: {
        city: '',
        district: '',
        street: '',
        number: null
      },
      description: ''
    }
  };
};

const state = getDefaultState();

const getters = {
  property: state => state.property,
  description: state => state.property.description,
  getBaseField: state => getField(state.property.base),
  getAddressField: state => getField(state.property.address),
  isOnOffer(state) {
    return state.property.base.type === 'eladó';
  }
};

const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  updateBaseField(state, field) {
    updateField(state.property.base, field);
  },
  updateAddressField(state, field) {
    updateField(state.property.address, field);
  },
  description(state, data) {
    state.property['description'] = data.description;
  }
};

const actions = {
  resetStateProperty({ commit }) {
    commit('resetState');
  },
  description({ commit }, data) {
    commit('description', data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
