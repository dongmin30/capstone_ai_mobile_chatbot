// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyAWJm7W_AeMgsW3zwwzfaHWwvlpb8q4EgI",
    authDomain: "capstone-chat-app-1a521.firebaseapp.com",
    databaseURL: "https://capstone-chat-app-1a521-default-rtdb.firebaseio.com",
    projectId: "capstone-chat-app-1a521",
    storageBucket: "capstone-chat-app-1a521.appspot.com",
    messagingSenderId: "396227281235",
    appId: "1:396227281235:web:845d0a30afca8023f621a6",
    measurementId: "G-VNKF2TQFK0"
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };