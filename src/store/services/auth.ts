/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createUserWithEmailAndPassword,
  deleteUser,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword as updatePasswordFirebase,
  User
} from "firebase/auth";

import firebaseApp from "@/config/firebase";

const LOGIN_URL = "https://cemei.vercel.app/login";

const getFirebaseAuth = () => getAuth(firebaseApp);

export const waitForUser = (callback: (user: User | null) => void) => {
  const auth = getFirebaseAuth();
  return auth.onAuthStateChanged(callback);
};

export const loginWithGoogle = async () => {
  const auth = getFirebaseAuth();
  try {
    const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
    return {
      user: userCred.user,
      error: null
    };
  } catch (error: any) {
    return {
      user: null,
      error: error.message
    };
  }
};

export const loginWithFacebook = async () => {
  const auth = getFirebaseAuth();
  try {
    const userCred = await signInWithPopup(auth, new FacebookAuthProvider());
    return {
      user: userCred.user,
      error: null
    };
  } catch (error: any) {
    return {
      user: null,
      error: error.message
    };
  }
};

export const createUserWithEmailAndPasswordLocal = async (
  email: string,
  password: string
) => {
  const auth = getFirebaseAuth();
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(userCred.user, {
      url: process.env.NEXT_PUBLIC_LOGIN_URL ?? LOGIN_URL
    });
    return {
      user: userCred.user,
      error: null
    };
  } catch (error: any) {
    return {
      user: null,
      error: error.message
    };
  }
};

export const signInWithEmailAndPasswordLocal = async (
  email: string,
  password: string
) => {
  const auth = getFirebaseAuth();
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCred.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const recoverPassword = async (email: string) => {
  const auth = getFirebaseAuth();
  try {
    await sendPasswordResetEmail(auth, email, {
      url: process.env.NEXT_PUBLIC_LOGIN_URL ?? LOGIN_URL
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteOwnAccount = async () => {
  const auth = getFirebaseAuth();
  if (auth.currentUser !== null) {
    try {
      await deleteUser(auth.currentUser);
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }
};

export const updatePassword = async (password: string) => {
  const auth = getFirebaseAuth();
  if (auth.currentUser !== null) {
    try {
      await updatePasswordFirebase(auth.currentUser, password);
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }
};

export const logout = async () => {
  const auth = getFirebaseAuth();
  await signOut(auth);
};
