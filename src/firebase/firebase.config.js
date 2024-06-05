// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrOBSL54Ey-EyK5mc6bCFR7QJPm6zH_zM",
  authDomain: "apply4scholar.firebaseapp.com",
  projectId: "apply4scholar",
  storageBucket: "apply4scholar.appspot.com",
  messagingSenderId: "281367635064",
  appId: "1:281367635064:web:6f6db05160ad8debe3398d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
