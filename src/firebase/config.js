// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth }  from 'firebase/auth'
import { getFirestore }  from 'firebase/firestore/lite'
import { getAnalytics } from "firebase/analytics";
import { getEnvironments } from "../helpers/getEnvironments";

// const VITE_APIKEY = "AIzaSyD_ASiSC7GQMrx4VWMouthiEcUtT_gQe4I";
// const VITE_AUTHDOMAIN = "react-curss.firebaseapp.com";
// const VITE_PROJECTID = "react-curss";
// const VITE_STORAGEBUCKET = "react-curss.appspot.com";
// const VITE_MESSAGINGSENDERID = "728772359847";
// const VITE_APPID = "1:728772359847:web:30a3f79dfd6c6013ae8d82";
// const VITE_MEASUREMENTID = "G-M7M0BKDGT2";
// const {
//   VITE_APIKEY,
//   VITE_AUTHDOMAIN,
//   VITE_DATABASEURL,
//   VITE_PROJECTID,
//   VITE_STORAGEBUCKET,
//   VITE_MESSAGINGSENDERID,
//   VITE_APPID,
// } = getEnvironments();


const firebaseConfig = {
  apiKey: "AIzaSyD_ASiSC7GQMrx4VWMouthiEcUtT_gQe4I",
  authDomain: "react-curss.firebaseapp.com",
  projectId: "react-curss",
  storageBucket: "react-curss.appspot.com",
  messagingSenderId: "728772359847",
  appId: "1:728772359847:web:30a3f79dfd6c6013ae8d82",
  measurementId: "G-M7M0BKDGT2"
};


// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );

// const analytics = getAnalytics(app);