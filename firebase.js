import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
  browserLocalPersistence,
  indexedDBLocalPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCW9L0nAeyme1JG132hZU5Z0kXh4RxPj74",
  authDomain: "cartomancy-app.firebaseapp.com",
  projectId: "cartomancy-app",
  storageBucket: "cartomancy-app.firebasestorage.app",
  messagingSenderId: "238944648104",
  appId: "1:238944648104:web:b91d409694a67d06df7b9d",
  measurementId: "G-Y4BZXXY2WG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with web persistence
const auth = getAuth(app);

// Initialize other Firebase services
let analytics = null;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch(err => {
  console.warn('Firebase Analytics not supported:', err);
});
const db = getFirestore(app);

// Export Firebase instances and auth methods
export {
  app,
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut
};

// Export analytics conditionally
export { analytics };