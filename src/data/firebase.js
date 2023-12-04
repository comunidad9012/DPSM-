import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBupyH7QVXDEBy5SJheJaNJqw-WlpjTzM4",
  authDomain: "dpsm-rgb.firebaseapp.com",
  projectId: "dpsm-rgb",
  storageBucket: "dpsm-rgb.appspot.com",
  messagingSenderId: "359027577979",
  appId: "1:359027577979:web:61c7502aeead1e20e7bede"
};

const firebaseApp = initializeApp(firebaseConfig);


export const storage = getStorage();

export default firebaseApp;