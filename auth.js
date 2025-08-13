// auth.js
// Lightweight auth helpers (requireLogin checks user role in /users collection)

import { auth, db } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

import {
  doc, getDoc
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

async function getUserRole(uid) {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (!snap.exists()) return null;
    return snap.data().role || null;
  } catch (err) {
    console.error('getUserRole error', err);
    return null;
  }
}

/**
 * requireLogin(expectedRole)
 * - resolves { user, role } if logged-in and role matches (if expectedRole provided)
 * - rejects with { code: 'NO_AUTH' } or { code: 'WRONG_ROLE', role }
 */
function requireLogin(expectedRole = null) {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        unsub();
        reject({ code: 'NO_AUTH' });
        return;
      }
      const role = await getUserRole(user.uid);
      unsub();
      if (expectedRole && role !== expectedRole) {
        reject({ code: 'WRONG_ROLE', role });
      } else {
        resolve({ user, role });
      }
    });
  });
}

async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

async function logout() {
  return signOut(auth);
}

export { requireLogin, login, logout, getUserRole };
