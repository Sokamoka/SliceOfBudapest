import firebase from '@/firebase/firebase';
import db from '@/firebase/db';
import storage from '@/firebase/storage';
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
    },
    images: [],
    onError: ''
  };
};

const state = getDefaultState();

const getters = {
  property: state => state.property,
  description: state => state.property.description,
  getBaseField: state => getField(state.property.base),
  getAddressField: state => getField(state.property.address),
  getDetailsField: state => getField(state.property.details),
  isOnOffer: state => state.property.base.type === PROPERTY_ONSALE_KEY,
  images: state => state.images,
  onError: state => state.onError
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
  },
  updateImages(state, data) {
    state.images = data;
  },
  deleteImage(state, index) {
    state.images.splice(index, 1);
  }
};

const actions = {
  async addProperty({ state }, property) {
    state.onError = '';
    const result = await db.collection('properties').doc();

    let imageURLs = [];
    let fileData;
    for (let image of state.images) {
      try {
        fileData = await storage
          .ref(`/properties/${result.id}`)
          .child(image.name)
          .put(image.file);
      } catch (error) {
        console.error('ERROR:', error);
        state.onError = error;
      }
      const downloadURL = await fileData.ref.getDownloadURL();
      imageURLs.push(downloadURL);
    }

    property.id = result.id;
    property.created_at = firebase.firestore.FieldValue.serverTimestamp();
    property.updated_at = firebase.firestore.FieldValue.serverTimestamp();
    property.images = imageURLs;

    try {
      await db
        .collection('properties')
        .doc(property.id)
        .set(property);
    } catch (error) {
      console.error('ERROR', error);
      state.onError = error;
    }

    // storage
    //   .ref(`/properties/${result.id}`)
    //   .putFiles(state.images)
    //   .then(metadatas => {
    //     console.log(metadatas);
    //   })
    //   .catch(function(error) {
    //     console.log('ERROR:', error);
    //   });

    // let file;
    // try {
    //   file = await storage
    //     .ref(`/properties/${result.id}/${state.images[0].name}`)
    //     .put(state.images[0].file);
    // } catch (error) {
    //   console.error(error);
    //   state.onError = error;
    // }
    // const file = await storage
    //   .ref(`/properties/${result.id}/${state.images[0].name}`)
    //   .put(state.images[0].file);
    // console.log(file);
  },
  resetStateProperty({ commit }) {
    commit('resetState');
  },
  description({ commit }, data) {
    commit('description', data);
  },
  deleteImage({ commit, state }, name) {
    const index = state.images.findIndex(item => item.name === name);
    commit('deleteImage', index);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
