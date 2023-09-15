// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGVFG2-AHThJfi5_mhVhAUgu5T1uoMQLk",
  authDomain: "tripplanner-113f7.firebaseapp.com",
  projectId: "tripplanner-113f7",
  storageBucket: "tripplanner-113f7.appspot.com",
  messagingSenderId: "744387423732",
  appId: "1:744387423732:web:39e9fe73475936a2e5dda1",
  measurementId: "G-E9XRF6B7HQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});