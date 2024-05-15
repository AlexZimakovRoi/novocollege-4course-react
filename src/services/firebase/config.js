import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAib30L_TD329iKWBuBlOGl1_Ykq-9i4qI",
  authDomain: "novocollege-4course.firebaseapp.com",
  projectId: "novocollege-4course",
  storageBucket: "novocollege-4course.appspot.com",
  messagingSenderId: "888554196425",
  appId: "1:888554196425:web:6f22adab5cc418a935ec18"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);