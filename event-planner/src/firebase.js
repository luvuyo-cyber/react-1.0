import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAD_XMDikK8CNJdgM2U33jD92T4galRVuU",
  authDomain: "event-planner-app-b3b05.firebaseapp.com",
  projectId: "event-planner-app-b3b05",
  storageBucket: "event-planner-app-b3b05.firebasestorage.app",
  messagingSenderId: "317158841202",
  appId: "1:317158841202:web:51ba4b7f5b3c249f8adbeb",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
