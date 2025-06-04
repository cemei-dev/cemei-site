/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth, User } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where
} from "firebase/firestore";

import firebaseApp from "@/config/firebase";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const tableName = "users";

export const getAllManagers = async () => {
  const q = query(collection(db, "users"), where("role", "==", "manager"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data()
  }));
};

export const getUserDoc = async (uid: string) => {
  if (uid === "") return null;
  return new Promise<DocumentData | null>((resolve, reject) => {
    const docRef = doc(db, tableName, uid);

    getDoc(docRef)
      .then((data) => {
        const userData = data.data();
        resolve(userData || null);
      })
      .catch((error) => reject(error));
  });
};

export const getAllUsers = async () => {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data()
  }));
};

export const waitForUser = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback);
};

export const updateUserDoc = async (
  uid: string,
  email?: string,
  name?: string,
  phone?: string
) => {
  try {
    await updateDoc(doc(db, tableName, uid), {
      email,
      name,
      phone
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteUserDoc = async (id: string) => {
  try {
    await deleteDoc(doc(db, tableName, id));
  } catch (error: any) {
    return { error: error.message };
  }
};
