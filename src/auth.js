import firebase from 'firebase';
import firebaseui from 'firebaseui';

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID
};

const auth = {
  context: null,
  uiConfig: null,
  ui: null,

  init(context) {
    this.context = context;

    firebase.initializeApp(config);
    this.uiConfig = {
      signInSuccessUrl: 'dashboard',
      signInOptions: [
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());

    firebase.auth().onAuthStateChanged(user => {
      this.context.$store.dispatch('user/setCurrentUser');

      let requireAuth = this.context.$route.matched.some(
        record => record.meta.requireAuth
      );
      let guestOnly = this.context.$route.matched.some(
        record => record.meta.guestOnly
      );

      if (requireAuth && !user) this.context.$router.push('auth');
      else if (guestOnly && user) this.context.$router.push('dashboard');
    });
  },
  authForm(container) {
    this.ui.start(container, this.uiConfig);
  },
  user() {
    return this.context ? firebase.auth().currentUser : null;
  },
  logout() {
    firebase.auth().signOut();
  }
};

export default auth;
