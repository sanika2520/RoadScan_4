import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEtG1OrGnZJJZRuzyFvXWBXhbqgaTdN5c",
  authDomain: "roadscan-d5072.firebaseapp.com",
  projectId: "roadscan-d5072",
  storageBucket: "roadscan-d5072.firebasestorage.app",
  messagingSenderId: "1032012426453",
  appId: "1:1032012426453:web:430eacf51d9400e500465c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;
export const db = getFirestore(app);