import { firebaseAction } from 'vuexfire';
import db from '@/firebase/db';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    properties: [],
    property: []
  },
  getters: {
    getProperties: state => state.properties,
    getProperty: state => state.property,
    isLoading: state => state.isLoading,
    onError: state => state.onError,
    getComment: state => (state.propterty ? state.property[0].comment : '')
  },
  mutations: {
    updateComment(state, value) {
      state.property[0].comment = value;
    },
    updateProperties(state) {
      state.properties = state.propertiesCollection;
    }
  },
  actions: {
    init: firebaseAction(({ state, rootState, bindFirebaseRef }) => {
      state.isLoading = true;
      bindFirebaseRef(
        'properties',
        db.collection('properties').orderBy('created_at', 'desc')
      )
        .then(() => {
          state.isLoading = false;
        })
        .catch(error => {
          // console.error('ERROR:', error);
          rootState.error.onError = error.message;
        });
    }),
    initProperty: firebaseAction(({ bindFirebaseRef }, id) => {
      bindFirebaseRef(
        'property',
        db.collection('properties').where('id', '==', id)
      );
    }),
    async saveComment({ rootState }, data) {
      // console.log('Store:', data);
      try {
        await db
          .collection('properties')
          .doc(data.id)
          .update({
            comment: data.comment
          });
      } catch (error) {
        // console.error('ON-ERROR:', error);
        rootState.error.onError = error.message;
      }
    }
  }
};
