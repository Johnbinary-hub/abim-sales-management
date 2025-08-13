// offline.js - enable Firestore IndexedDB persistence
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore, enableIndexedDbPersistence } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAGrBbHkK_xQvcWTr6wk2NDqwXhSI-AYys",
  authDomain: "abimbest-sales-management.firebaseapp.com",
  projectId: "abimbest-sales-management",
  storageBucket:"abimbest-sales-management.firebasestorage.app",
  messagingSenderId: "400811478351",
  appId: "1:400811478351:web:4ad21456c998776f0e893a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

enableIndexedDbPersistence(db).catch(err => {
  if (err.code === 'failed-precondition') console.warn('Persistence failed-precondition (multiple tabs?)');
  else if (err.code === 'unimplemented') console.warn('Persistence not available in this browser');
});
