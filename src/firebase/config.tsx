import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCalaz002KkY45tTHNegJs6BEz4VhED38M",
    authDomain: "miniblog-b2776.firebaseapp.com",
    projectId: "miniblog-b2776",
    storageBucket: "miniblog-b2776.appspot.com",
    messagingSenderId: "731769553631",
    appId: "1:731769553631:web:5bfcf7cfdb83ddb83cdf6a",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
