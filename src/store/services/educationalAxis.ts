import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { EducationalAxisEntity } from "@/common/entities/educationalAxis";
import firebaseApp from "@/config/firebase";
const db = getFirestore(firebaseApp);
const tablename = "educationalAxis";

export const getEducationalAxisById = async (id: string) => {
  const educationalAxisRef = doc(db, tablename, id);
  const querySnapshot = await getDoc(educationalAxisRef);
  return querySnapshot.data();
};

export const getAllEducationalAxis = async () => {
  const q = query(collection(db, tablename));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));
};

export const addEducationalAxis = async (
  data: Omit<EducationalAxisEntity, "id">
) => {
  const educationalAxisId = uuidv4();
  try {
    const educationalAxisRef = doc(
      collection(db, tablename),
      educationalAxisId
    );
    await setDoc(educationalAxisRef, {
      ...data,
      id: educationalAxisId
    });
  } catch (error) {
    console.error("Error adding educational axis:", error);
  }
};

export const deleteEducationalAxis = async (id: string) => {
  const educationalAxisRef = doc(db, tablename, id);
  await deleteDoc(educationalAxisRef);
};
