import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);  
  const [profile, setProfile] = useState(null); 
  const [loading, setLoading] = useState(true);  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchProfile(firebaseUser.uid);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function fetchProfile(uid) {
    const snap = await getDoc(doc(db, 'users', uid));
    setProfile(snap.exists() ? snap.data() : null);
  }

  async function register(email, password) {
    const { user: u } = await createUserWithEmailAndPassword(auth, email, password);
    const data = {
      email:     u.email,
      name:      '',
      age:       '',
      city:      '',
      createdAt: serverTimestamp(),
    };
    await setDoc(doc(db, 'users', u.uid), data);
    setProfile(data);
  }

  async function login(email, password) {
    const { user: u } = await signInWithEmailAndPassword(auth, email, password);
    await fetchProfile(u.uid);
  }

  async function logout() {
    await signOut(auth);
  }

  async function updateProfile(data) {
    if (!user) throw new Error('Not authenticated');
    await updateDoc(doc(db, 'users', user.uid), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    setProfile(prev => ({ ...prev, ...data }));
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }

  async function deleteAccount(password) {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    await deleteDoc(doc(db, 'users', user.uid));
    await deleteUser(user);
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      isAuthenticated: !!user,
      register,
      login,
      logout,
      updateProfile,
      resetPassword,
      deleteAccount,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
