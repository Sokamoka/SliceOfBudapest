import { firebaseAction } from 'vuexfire';

export default {
  namespaced: true,
  state: {
    properties: []
    // properties: [
    //   {
    //     id: 0,
    //     address: '3. kerület, Tímár utca',
    //     price: 150000,
    //     area: 96
    //   },
    //   {
    //     id: 1,
    //     address: '3. kerület, Testvérhegy Lakókert II.ütem',
    //     price: 150000,
    //     area: 96
    //   },
    //   {
    //     id: 2,
    //     address: '3. kerület, Tímár utca',
    //     price: 150000,
    //     area: 96
    //   }
    // ]
  },
  getters: {
    getProperties: state => state.properties
  },
  mutations: {},
  actions: {
    setPropertiesRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
      bindFirebaseRef('properties', ref);
    })
  }
};
