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

import { StrategyEntity } from "@/common/entities/strategy";
import firebaseApp from "@/config/firebase";
const db = getFirestore(firebaseApp);
const tablename = "strategies";

export const getAllStrategies = async () => {
  const q = query(collection(db, tablename));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
};

export const getCityGoalStrategies = async (cityId: string, goalId: string) => {
  const q = query(
    collection(db, tablename),
    where("cityId", "==", cityId),
    where("goalId", "==", goalId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
};

export const addStrategy = async (data: Omit<StrategyEntity, "id">) => {
  const strategyId = uuidv4();
  try {
    const strategyRef = doc(collection(db, tablename), strategyId);
    await setDoc(strategyRef, {
      ...data,
      id: strategyId
    });
  } catch (error) {
    console.error("Error adding strategy:", error);
  }
};

export const deleteStrategy = async (id: string) => {
  const strategyRef = doc(db, tablename, id);
  await deleteDoc(strategyRef);
};

export const updateStrategy = async (
  id: string,
  data: Partial<StrategyEntity>
) => {
  try {
    const strategyRef = doc(db, tablename, id);
    await updateDoc(strategyRef, data);
  } catch (error) {
    console.error("Error updating strategy:", error);
  }
};
