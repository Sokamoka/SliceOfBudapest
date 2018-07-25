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
    init: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef(
        'properties',
        db.collection('properties').orderBy('created_at', 'desc'),
        {
          readyCallback: () => {
            console.log('Ready!');
          }
        }
      );
    }),
    initProperty: firebaseAction(({ bindFirebaseRef }, id) => {
      bindFirebaseRef(
        'property',
        db.collection('properties').where('id', '==', id)
      );
    })
  }
};
