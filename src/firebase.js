// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQVPLoWgsbwyyHEIJDO6kzIC04uV-5EkY",
  authDomain: "yellow-web-widget-generator.firebaseapp.com",
  projectId: "yellow-web-widget-generator",
  storageBucket: "yellow-web-widget-generator.appspot.com",
  messagingSenderId: "1054618723753",
  appId: "1:1054618723753:web:4ab2e82c8b07d3222610b8",
  measurementId: "G-YBL5V34C7C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
