import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDPDHZUaN2WC2-ub3G3LTwHvRqv3f9pe_c",
  authDomain: "brainfolio-1faf6.firebaseapp.com",
  databaseURL: "https://brainfolio-1faf6.firebaseio.com",
  projectId: "brainfolio-1faf6",
  storageBucket: "brainfolio-1faf6.appspot.com",
  messagingSenderId: "360005039332",
  appId: "1:360005039332:web:99bef747aac8afcc15e8f1",
  measurementId: "G-7GS0M952C3"
};

firebase.initializeApp(firebaseConfig);

export default firebase;