// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    // apiKey: "AIzaSyDWiqkU8vSZOlAtNAgtZXYkhst2DXZHnVo",
    // authDomain: "nb-online-canvas.firebaseapp.com",
    // databaseURL: "https://nb-online-canvas.firebaseio.com",
    // projectId: "nb-online-canvas",
    // storageBucket: "nb-online-canvas.appspot.com",
    // messagingSenderId: "260582057875",
    // appId: "1:260582057875:web:bbbf08e54c4b50519bea66",
    // measurementId: "G-NR1Z4P61BR"

    apiKey: "AIzaSyDlep-44vaF1wAuNK_VVJWV3XPKOmmTY5Y",
    authDomain: "canvas-dev-19b6a.firebaseapp.com",
    databaseURL: "https://canvas-dev-19b6a.firebaseio.com",
    projectId: "canvas-dev-19b6a",
    storageBucket: "canvas-dev-19b6a.appspot.com",
    messagingSenderId: "72492574403",
    appId: "1:72492574403:web:80ad9fd5ca55fad4e4e476"

    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGEING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_ID
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };