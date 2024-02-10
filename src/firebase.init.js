// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyChzQBKUmhDJn1zRCbBWmCHLFElcGwi6Jg",
  // authDomain: "bmw-car-v1.firebaseapp.com",
  // projectId: "bmw-car-v1",
  // storageBucket: "bmw-car-v1.appspot.com",
  // messagingSenderId: "982638039509",
  // appId: "1:982638039509:web:2425b96f4d60b37a2ead5c",
  apiKey: "AIzaSyArzJpcgeaj5rDVU9iloeLqyAuT8QbAYC4",
  authDomain: "islamic-poshak.firebaseapp.com",
  projectId: "islamic-poshak",
  storageBucket: "islamic-poshak.appspot.com",
  messagingSenderId: "858675821994",
  appId: "1:858675821994:web:c46123866a03b47cc6bfd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;