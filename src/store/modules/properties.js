import { firebaseAction } from 'vuexfire';
import db from '@/firebase/db';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    onError: '',
    properties: [],
    property: {}
  },
  getters: {
    getProperties: state => state.properties,
    getProperty: state => state.property,
    isLoading: state => state.isLoading,
    onError: state => state.onError
  },
  actions: {
    init: firebaseAction(({ state, bindFirebaseRef }) => {
      state.isLoading = true;
      bindFirebaseRef(
        'properties',
        db.collection('properties').orderBy('created_at', 'desc')
      )
        .then(() => {
          state.isLoading = false;
        })
        .catch(err => {
          console.error('ERROR:', err);
          state.onError = err;
        });
    }),
    initProperty: firebaseAction(({ bindFirebaseRef }, id) => {
      bindFirebaseRef(
        'property',
        db.collection('properties').where('id', '==', id)
      );
    })
  }
};
