import firebase from '@/firebase/firebase';
import store from '@/store';
import db from '@/firebase/db';
// import router from '@/router';

firebase.auth().onAuthStateChanged(user => {
  console.log('user:', user);
  if (user) {
    // if (user.user) {
    //   /* eslint-disable */
    //   user = user.user;
    //   /* eslint-enable */
    // }
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
    // router.push('/subreddits');
  } else {
    store.commit('auth/setUser', null);
  }
});
