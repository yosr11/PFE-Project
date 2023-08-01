importScripts("https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js");
firebase.initializeApp({
    apiKey: "AIzaSyCKQyZSxJZdfpLKNEWZz8ZsuM7egxkmZJY",
    authDomain: "medisail-project.firebaseapp.com",
    projectId: "medisail-project",
    storageBucket: "medisail-project.appspot.com",
    messagingSenderId: "895463679389",
    appId: "1:895463679389:web:9dd640d49c24199f4c7b74",
    measurementId: "G-CLE7NGFBP7"
});
const messaging = firebase.messaging();