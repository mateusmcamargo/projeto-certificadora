import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore }  from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDG9YhlyCR9vQksRD9sfIuLZcXw8WNBFBw",
    authDomain: "projeto-certificadora.firebaseapp.com",
    projectId: "projeto-certificadora",
    storageBucket: "projeto-certificadora.firebasestorage.app",
    messagingSenderId: "894749700915",
    appId: "1:894749700915:web:16eb6e77d05615170b4446",
    measurementId: "G-CTZ2FSSKEM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();