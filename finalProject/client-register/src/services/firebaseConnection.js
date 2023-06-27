import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDIv9ce1sqpGIAVHdsNJDgTZfZXz1bm1Cg",
  authDomain: "clienttable-3565a.firebaseapp.com",
  projectId: "clienttable-3565a",
  storageBucket: "clienttable-3565a.appspot.com",
  messagingSenderId: "837181382377",
  appId: "1:837181382377:web:180f3ec0a16031194e9a78"
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);