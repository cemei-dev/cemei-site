import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { ResultEntity } from "@/common/entities/result";
import firebaseApp from "@/config/firebase";

const db = getFirestore(firebaseApp);
const tablename = "actionResults";

export const getAllActionsResults = async () => {
  const q = query(collection(db, tablename));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
};

export const getActionResults = async (actionId: string) => {
  const q = query(collection(db, tablename), where("actionId", "==", actionId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
};

export const getGoalResults = async (goalId: string) => {
  const q = query(collection(db, tablename), where("goalId", "==", goalId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
};

export const addActionResult = async (data: Omit<ResultEntity, "id">) => {
  const resultId = uuidv4();
  try {
    const resultRef = doc(collection(db, tablename), resultId);
    await setDoc(resultRef, {
      ...data,
      id: resultId
    });
  } catch (error) {
    console.error("Error adding action result:", error);
  }
};

export const deleteActionResult = async (id: string) => {
  const resultRef = doc(db, tablename, id);
  await deleteDoc(resultRef);
};

export const updateActionResult = async (
  id: string,
  data: Partial<ResultEntity>
) => {
  try {
    const resultRef = doc(db, tablename, id);
    await updateDoc(resultRef, data);
  } catch (error) {
    console.error("Error updating action result:", error);
  }
};
