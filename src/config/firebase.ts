// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAIVHokfvxSmzTrHJj_7m3JI6xbnuPc1MU",
    authDomain: "royal-taxi-7eba5.firebaseapp.com",
    projectId: "royal-taxi-7eba5",
    storageBucket: "royal-taxi-7eba5.appspot.com",
    messagingSenderId: "596451623204",
    appId: "1:596451623204:web:b41fb8df39b0cf9a9273b1",
    measurementId: "G-CTWPX2MFQ7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default auth