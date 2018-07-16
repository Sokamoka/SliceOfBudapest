import { firebaseAction } from 'vuexfire';
// import auth from '@/auth';

export default {
  namespaced: true,
  state: {
    properties: [],
    property: {}
  },
  getters: {
    getProperties: state => state.properties,
    getProperty: state => state.property
  },
  mutations: {},
  actions: {
    setPropertiesRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
      bindFirebaseRef('properties', ref);
    }),
    setPropertyRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
      bindFirebaseRef('property', ref);
    })
    // addProperty: property => {
    //   auth
    //     .getDB()
    //     .ref('properties')
    //     .push(property);
    // }
  }
};
