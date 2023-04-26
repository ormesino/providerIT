
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD0iKlNaK7U6dEn9DnwwJJ2xM0YT_HY2bA",
  authDomain: "todo-15954.firebaseapp.com",
  projectId: "todo-15954",
  storageBucket: "todo-15954.appspot.com",
  messagingSenderId: "474758772800",
  appId: "1:474758772800:web:2ea27ad74e2d4a3a7047a5",
  measurementId: "G-2DPWWN6Q5F"
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);