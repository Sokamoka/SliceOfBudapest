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
    rentCount: 0,
    searchResult: [],
    ref: {
      results: null,
      resultsNext: null
    },
    paging: {
      item_per_page: 2,
      end: false,
      loading: false
    }
  },
  getters: {
    getProperties: state => state.properties,
    getProperty: state => state.property,
    isLoading: state => state.isLoading,
    onError: state => state.onError,
    getComment: state => (state.propterty ? state.property[0].comment : ''),
    getPropertiesCount: state => state.propertiesCount,
    getOnSaleCount: state => state.saleCount,
    getOnRentCount: state => state.rentCount,
    searchResult: state => state.searchResult,
    paging: state => state.paging
  },
  mutations: {
    updateComment(state, value) {
      state.property[0].comment = value;
    },
    updateProperties(state) {
      state.properties = state.propertiesCollection;
    },
    resetSearchResult(state) {
      state.searchResult = [];
      state.ref.results = null;
      state.ref.resultsNext = null;
      state.paging.end = false;
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
    },
    // search: firebaseAction(({ bindFirebaseRef }, query) => {
    //   bindFirebaseRef(
    //     'searchResult',
    //     db
    //       .collection('properties')
    //       .where('base.type', '==', query.type)
    //       .where('base.propertiesType', '==', query.propertiesType)
    //   );
    // })
    search({ state, commit, dispatch }, ref) {
      commit('resetSearchResult');
      state.ref.results = ref;
      const firstPage = ref.limit(state.paging.item_per_page);
      dispatch('handlePaging', firstPage);
    },
    loadMore({ state, dispatch }) {
      if (state.paging.end) {
        return;
      }

      state.paging.loading = true;
      dispatch('handlePaging', state.ref.resultsNext).then(
        documentSnapshots => {
          state.paging.loading = false;

          if (documentSnapshots.empty) {
            /* If there is no more questions to load, set paging.end to true */
            state.paging.end = true;
          }
        }
      );
    },
    handlePaging({ state }, ref) {
      /*
          Fetch questions of given reference
      */
      return new Promise(resolve => {
        ref.get().then(documentSnapshots => {
          /* If documentSnapshots is empty, then we have loaded all of pages */
          if (documentSnapshots.empty) {
            state.paging.end = true;
            resolve(documentSnapshots);
          }

          console.log('size:', documentSnapshots.size);
          documentSnapshots.forEach(doc => {
            let resultData = doc.data();
            resultData.id = doc.id;
            state.searchResult.push(resultData);
          });

          /* Build reference for next page */
          const lastVisible =
            documentSnapshots.docs[documentSnapshots.size - 1];

          if (!lastVisible) {
            return;
          }

          state.ref.resultsNext = state.ref.results
            .startAfter(lastVisible)
            .limit(state.paging.item_per_page);

          resolve(documentSnapshots);
        });
      });
    }
  }
};
