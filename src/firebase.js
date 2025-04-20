import { initializeApp } from "firebase/app";
//import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//import {firebase} from "firebase/app";

const firebaseConfig = {

    apiKey: "AIzaSyBUrQJ5tnMCCJ6zITYgwp-FeanHQTo_QbA",
  
    authDomain: "resume-e7d10.firebaseapp.com",
  
    projectId: "resume-e7d10",
  
    storageBucket: "resume-e7d10.firebasestorage.app",
  
    messagingSenderId: "1054952519994",
  
    appId: "1:1054952519994:web:3fe53401b33f73f9f57803"
  
    
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


provider.setCustomParameters({
    prompt: "select_account", // forces account selection every time
  });

// Export the necessary parts
export { app,firebaseConfig,auth, provider,signInWithPopup };
