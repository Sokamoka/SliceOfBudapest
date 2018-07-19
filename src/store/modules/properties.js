import { firebaseAction } from 'vuexfire';
import db from '@/firebase/db';

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
  actions: {
    setPropertiesRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
      bindFirebaseRef('properties', ref);
    }),
    setPropertyRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
      bindFirebaseRef('property', ref);
    }),
    init: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('properties', db.collection('properties'));
      console.log('INIT');
    })
  }
};
