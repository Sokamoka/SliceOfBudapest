import firebase from '@/firebase/firebase';
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
    // setPropertiesRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    //   bindFirebaseRef('properties', ref);
    // }),
    // setPropertyRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    //   bindFirebaseRef('property', ref);
    // }),
    async addProperty({ state }, property) {
      const result = db.collection('properties').doc();
      console.log('result:', result, property, state);
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
    init: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('properties', db.collection('properties'));
      console.log('INIT');
    }),
    initProperty: firebaseAction(({ bindFirebaseRef }, id) => {
      console.log('getProperty');
      bindFirebaseRef(
        'property',
        db.collection('properties').where('id', '==', id)
      );
    })
  }
};
