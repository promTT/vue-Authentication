// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDczu7GxSQi6lvipREFyQbH--HQ2OO9UAk",
    authDomain: "vueauth-24ac9.firebaseapp.com",
    projectId: "vueauth-24ac9",
    storageBucket: "vueauth-24ac9.appspot.com",
    messagingSenderId: "973634198863",
    appId: "1:973634198863:web:8611d384b8e0b2eda7393a",
    measurementId: "G-21QRPB7HX6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }