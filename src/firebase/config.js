import { initializeApp } from 'firebase/app';
import {getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD2h_x-cNAaNWNMGHfu2UV_2sitbAtLyRs",
    authDomain: "planb-4383b.firebaseapp.com",
    projectId: "planb-4383b",
    storageBucket: "planb-4383b.appspot.com",
    messagingSenderId: "547177859002",
    appId: "1:547177859002:web:236c8f8a900f53dc40ff83",
    measurementId: "G-LQ9XNNCBLV"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export default app;