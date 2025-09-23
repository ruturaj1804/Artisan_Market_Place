import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACVoGboJkGkfCvw9BxvvPTcr9GjHTBE3s",
  authDomain: "login-auth-7354f.firebaseapp.com",
  projectId: "login-auth-7354f",
  storageBucket: "login-auth-7354f.firebasestorage.app",
  messagingSenderId: "1019309443388",
  appId: "1:1019309443388:web:276bd52bdc5aefb48fb639",
  measurementId: "G-4NJYZTYKLX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);