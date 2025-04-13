import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQipdnTnExB7wHS8RoqazRonO-M9y09zA",
  authDomain: "resume-25019.firebaseapp.com",
  projectId: "resume-25019",
  storageBucket: "resume-25019.firebasestorage.app",
  messagingSenderId: "737619886667",
  appId: "1:737619886667:web:fe2d9fad42d5a128c343ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
