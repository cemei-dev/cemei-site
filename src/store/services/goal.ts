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

import { GoalEntity } from "@/common/entities/goal";
import firebaseApp from "@/config/firebase";
const db = getFirestore(firebaseApp);
const tablename = "goals";

export const getAllGoals = async () => {
  const q = query(collection(db, tablename));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
};

export const getAxisGoals = async (axisId: string) => {
  const q = query(
    collection(db, tablename),
    where("educationalAxisId", "==", axisId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
};

export const addGoal = async (data: Omit<GoalEntity, "id">) => {
  const goalId = uuidv4();
  try {
    const eventRef = doc(collection(db, tablename), goalId);
    await setDoc(eventRef, {
      ...data,
      id: goalId
    });
  } catch (error) {
    console.error("Error adding goal:", error);
  }
};

export const deleteGoal = async (id: string) => {
  const goalRef = doc(db, tablename, id);
  await deleteDoc(goalRef);
};

export const updateGoal = async (id: string, data: Partial<GoalEntity>) => {
  try {
    const goalRef = doc(db, tablename, id);
    await updateDoc(goalRef, data);
  } catch (error) {
    console.error("Error updating goal:", error);
  }
};
