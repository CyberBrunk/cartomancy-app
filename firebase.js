// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);