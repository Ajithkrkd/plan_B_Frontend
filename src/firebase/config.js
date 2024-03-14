import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB9QOrXbtv45MEpqVFWAeUZeK4sAxjjU6M",
    authDomain: "olxclone-ajith.firebaseapp.com",
    projectId: "olxclone-ajith",
    storageBucket: "olxclone-ajith.appspot.com",
    messagingSenderId: "940706458691",
    appId: "1:940706458691:web:549ed99c2b6374582578f6",
    measurementId: "G-1ZHEW1NTSE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export default app;