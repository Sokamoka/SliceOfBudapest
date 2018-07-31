import { firebaseAction } from 'vuexfire';
import db from '@/firebase/db';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    properties: [],
    property: [],
    propertiesCount: 0,
    saleCount: 0,
    rentCount: 0
  },
  getters: {
    getProperties: state => state.properties,
    getProperty: state => state.property,
    isLoading: state => state.isLoading,
    onError: state => state.onError,
    getComment: state => (state.propterty ? state.property[0].comment : ''),
    getPropertiesCount: state => state.propertiesCount,
    getOnSaleCount: state => state.saleCount,
    getOnRentCount: state => state.rentCount
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
          state.isLoading = false;
          rootState.error.onError = error.message;
        });
    }),
    initProperty: firebaseAction(({ bindFirebaseRef }, id) => {
      bindFirebaseRef(
        'property',
        db.collection('properties').where('id', '==', id)
      );
    }),
    propertiesCount: ({ state, rootState }) => {
      state.isLoading = true;
      db.collection('properties')
        .get()
        .then(snap => {
          state.propertiesCount = snap.size;
          state.isLoading = false;
        })
        .catch(error => {
          state.isLoading = false;
          rootState.error.onError = error.message;
        });
    },
    propertiesCategoryCount: ({ state, rootState }, type) => {
      db.collection('properties')
        .where('base.type', '==', type)
        .get()
        .then(snap => {
          state[`${type}Count`] = snap.size;
        })
        .catch(error => {
          rootState.error.onError = error.message;
        });
    },
    async saveComment({ rootState }, data) {
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
