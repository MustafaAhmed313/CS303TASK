import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDC8MBcR_ElZ58qneTyqY4PUaTFA230axc",
    authDomain: "todoapp-63828.firebaseapp.com",
    projectId: "todoapp-63828",
    storageBucket: "todoapp-63828.appspot.com",
    messagingSenderId: "630189657874",
    appId: "1:630189657874:web:2f997f3fd76a18432aadcb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app , db , auth}