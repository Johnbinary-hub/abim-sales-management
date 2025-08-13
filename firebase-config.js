// firebase-config.js
// Put this file in the same folder as your HTML files.
// Replace config values if you have different Firebase project credentials.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

const firebaseConfig = {
apiKey: "AIzaSyAGrBbHkK_xQvcWTr6wk2NDqwXhSI-AYys",
  authDomain: "abimbest-sales-management.firebaseapp.com",
  projectId: "abimbest-sales-management",
  storageBucket: "abimbest-sales-management.firebasestorage.app",
  messagingSenderId: "400811478351",
  appId: "1:400811478351:web:4ad21456c998776f0e893a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
