import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCQSkvuXLIS__GbzBZNVhVvifWnwDQkijY",
  authDomain: "primeflix-a8ae2.firebaseapp.com",
  projectId: "primeflix-a8ae2",
  storageBucket: "primeflix-a8ae2.appspot.com",
  messagingSenderId: "249054427441",
  appId: "1:249054427441:web:26b9922e35112402ec9810",
  measurementId: "G-N6F32ZDXYJ"
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);