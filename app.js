import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBI2Qzdve28WbGxJyZp4HdAXNTO6_9uKTw",
    authDomain: "test-3e396.firebaseapp.com",
    projectId: "test-3e396",
    storageBucket: "test-3e396.firebasestorage.app",
    messagingSenderId: "533740502915",
    appId: "1:533740502915:web:df419c0ed9c46cd9cd00b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const authForm = document.querySelector("#auth-form");
const secretContent = document.querySelector("#secretContent");
const signInBtn = document.querySelector("#signInBtn");
const signOutBtn = document.querySelector("#signOutBtn");
const signUpBtn = document.querySelector("#signUpBtn");
g

secretContent.style.display = "none";

const userSignUp = async() => {
    const signUpEmail = userEmail.value;
    const signUpPassword = userPassword.value;
    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("Your account has been created!");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage)
    })
}

const userSignIn = async() => {
    const signInEmail = userEmail.value;
    const signInPassword = userPassword.value;
    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("You have signed in successfully!");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage)
    })
}

const checkAuthState = async() => {
    onAuthStateChanged(auth, user => {
        if(user) {
            authForm.style.display = 'none';
            secretContent.style.display = 'block';
        }
        else {
            authForm.style.display = 'block';
            secretContent.style.display = 'none';
        }
    })
}

const userSignOut = async() => {
    await signOut(auth);
}

checkAuthState();

signUpBtn.addEventListener('click', userSignUp);
signInBtn.addEventListener('click', userSignIn);
signOutBtn.addEventListener('click', userSignOut);