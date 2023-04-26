import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC25CFfXDPk_5v4vKTM5dZKZuiV6Xp4pTw",
  authDomain: "teste-c6d2b.firebaseapp.com",
  projectId: "teste-c6d2b",
  storageBucket: "teste-c6d2b.appspot.com",
  messagingSenderId: "781891942509",
  appId: "1:781891942509:web:d583b31a403d4f65306764",
  measurementId: "G-GJ2EV80P48"
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);