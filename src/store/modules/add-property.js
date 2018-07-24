import firebase from '@/firebase/firebase';
import db from '@/firebase/db';
import { getField, updateField } from 'vuex-map-fields';
import { PROPERTY_ONSALE_KEY } from '../../constants';

const getDefaultState = () => {
  return {
    property: {
      base: {
        type: PROPERTY_ONSALE_KEY,
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
      details: {
        minRentTime: null,
        cautions: null,
        rooms: null,
        halfrooms: null,
        material: '',
        comfort: '',
        condition: '',
        energy: '',
        floor: '',
        elevator: '',
        balcony: '',
        toiletWithBath: '',
        parking: '',
        innerHeight: '',
        furnishing: '',
        machinery: '',
        garden: '',
        generation: '',
        views: '',
        direction: '',
        noBaths: '',
        noToilets: '',
        heating: '',
        built: null,
        buildingLevels: null,
        groundSize: null
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
  getDetailsField: state => getField(state.property.details),
  isOnOffer: state => state.property.base.type === PROPERTY_ONSALE_KEY
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
  updateDetailsField(state, field) {
    updateField(state.property.details, field);
  },
  description(state, data) {
    state.property['description'] = data.description;
  }
};

const actions = {
  async addProperty({ state }, property) {
    const result = db.collection('properties').doc();
    console.log('result:', result, state);
    property.id = result.id;
    property.created_at = firebase.firestore.FieldValue.serverTimestamp();
    property.updated_at = firebase.firestore.FieldValue.serverTimestamp();
    try {
      await db
        .collection('properties')
        .doc(property.id)
        .set(property);
    } catch (error) {
      console.error(error);
    }
  },
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
