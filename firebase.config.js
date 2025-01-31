// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    
    // apiKey: "AIzaSyC_dyaHfvbPne9GyYasm0L1P2MNjVKvvvw",
    // authDomain: "next-level-school.firebaseapp.com",
    // projectId: "next-level-school",
    //  storageBucket: "next-level-school.firebasestorage.app",
    // messagingSenderId: "1080352786068",
    // appId: "1:1080352786068:web:58521093f1aa55ce0e5681"

    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID

    
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
