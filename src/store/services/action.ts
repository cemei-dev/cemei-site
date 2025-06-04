import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { ActionEntity } from "@/common/entities/action";
import firebaseApp from "@/config/firebase";

const db = getFirestore(firebaseApp);
const tablename = "actions";

export const getAllActions = async () => {
  const q = query(collection(db, tablename));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
};

export const getAction = async (id: string) => {
  const actionRef = doc(db, tablename, id);
  const querySnapshot = await getDoc(actionRef);
  return querySnapshot.data();
};

export const getCityActions = async (cityId: string) => {
  const q = query(collection(db, tablename), where("cityId", "==", cityId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
};

export const getStrategyActions = async (strategyId: string) => {
  const q = query(
    collection(db, tablename),
    where("strategyId", "==", strategyId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
};

export const addAction = async (data: Omit<ActionEntity, "id">) => {
  const actionId = uuidv4();
  try {
    const actionRef = doc(collection(db, tablename), actionId);
    await setDoc(actionRef, {
      ...data,
      id: actionId
    });
  } catch (error) {
    console.error("Error adding action:", error);
  }
};

export const deleteAction = async (id: string) => {
  const actionRef = doc(db, tablename, id);
  await deleteDoc(actionRef);
};

export const updateAction = async (id: string, data: Partial<ActionEntity>) => {
  try {
    const actionRef = doc(db, tablename, id);
    await updateDoc(actionRef, data);
  } catch (error) {
    console.error("Error updating action:", error);
  }
};
