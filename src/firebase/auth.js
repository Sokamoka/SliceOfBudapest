import firebase from '@/firebase/firebase';
import store from '@/store';
import db from '@/firebase/db';
import { i18n } from '@/localization';
import { router } from '@/router';

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const setUser = {
      id: user.uid,
      name: user.displayName,
      image: user.photoURL,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    };
    db.collection('users')
      .doc(setUser.id)
      .set(setUser);
    store.commit('auth/setUser', setUser);
    router.push({ name: 'dashboard', params: { locale: i18n.locale } });
  } else {
    store.commit('auth/setUser', null);
  }
});
