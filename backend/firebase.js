// // import { initializeApp } from "firebase/app";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries
// // import { getAuth } from 'firebase/auth';

// import firebase from 'firebase/app';
// import 'firebase/auth';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCQipdnTnExB7wHS8RoqazRonO-M9y09zA",
//   authDomain: "resume-25019.firebaseapp.com",
//   projectId: "resume-25019",
//   storageBucket: "resume-25019.firebasestorage.app",
//   messagingSenderId: "737619886667",
//   appId: "1:737619886667:web:fe2d9fad42d5a128c343ce"
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);

// export const googleLogin = async () => {
//   const provider = new firebase.auth.GoogleAuthProvider();

//   try {
//     const result = await firebaseApp.auth().signInWithPopup(provider);
//     const user = result.user;
//     const idToken = await user.getIdToken();

//     // Send the ID token to your backend for verification
//     const res = await fetch('http://localhost:3000/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ token: idToken }),
//     });

//     const data = await res.json();
//     console.log(data); // Handle the response from the server
//   } catch (error) {
//     console.error("Google login error:", error);
//   }
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // export const auth = getAuth(app);
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export { auth, provider };


// firebase.js (using CommonJS)
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountkey.json'); // path to your service account key

// Initialize the Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = { admin };


