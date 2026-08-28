// ============================================================
// Firebase Configuration — ASENT Website Admin
// ============================================================

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC4JdiEnpp3NaLoJbjBTv5OS2Bn_BacDzE",
  authDomain: "asnet-admin.firebaseapp.com",
  projectId: "asnet-admin",
  storageBucket: "asnet-admin.firebasestorage.app",
  messagingSenderId: "1073775992026",
  appId: "1:1073775992026:web:f6e3da3d371e08a58a59e3",
  measurementId: "G-WSW2FBVZP4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
