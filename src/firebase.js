import firebase from 'firebase/app';
require("firebase/firestore");


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDAKBu93Uiln9UC4I9cep7iOxSxYASR6QY",
  authDomain: "texdesigners-f39d2.firebaseapp.com",
  databaseURL: "https://texdesigners-f39d2.firebaseio.com",
  projectId: "texdesigners-f39d2",
  storageBucket: "texdesigners-f39d2.appspot.com",
  messagingSenderId: "455315332724"
};
firebase.initializeApp(config);

export default firebase;
