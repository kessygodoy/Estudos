import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbr41iA3rXhlL_XLuQ2pvIfJzHiIRMLWk",
  authDomain: "miniblog-5037a.firebaseapp.com",
  projectId: "miniblog-5037a",
  storageBucket: "miniblog-5037a.firebasestorage.app",
  messagingSenderId: "8908814270",
  appId: "1:8908814270:web:09d87c7db8e7f573f6abef"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth  };