import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAmyMSLF2iRu5s_PPRVEeUNIiXwjNkZUw4",
  authDomain: "covid-19-bd72e.firebaseapp.com",
  projectId: "covid-19-bd72e",
  storageBucket: "covid-19-bd72e.appspot.com",
  messagingSenderId: "1022020946995",
  appId: "1:1022020946995:web:5775dc925304690a33e746",
  measurementId: "G-2VK33J1P4Y",
});

const db = getFirestore(firebaseApp);
export { db };
