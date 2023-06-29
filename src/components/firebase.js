import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCtYDpISyqKeI5UAAjZlkf49tU8RL8fFXk",
    authDomain: "ballpark-gamma.firebaseapp.com",
    projectId: "ballpark-gamma",
    storageBucket: "ballpark-gamma.appspot.com",
    messagingSenderId: "672170777780",
    appId: "1:672170777780:web:266de06308a77ce10fcbe1",
    measurementId: "G-FXNLPEN4T0"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  

const messaging = firebase.messaging();
const firestore = firebase.firestore();

export { messaging, firestore };