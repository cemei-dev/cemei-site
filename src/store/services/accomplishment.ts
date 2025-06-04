import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where
} from "firebase/firestore";

import { AccomplishmentEntity } from "@/common/entities/accomplishment";
import firebaseApp from "@/config/firebase";

const db = getFirestore(firebaseApp);
const tablename = "accomplishments";

export const addAccomplishment = async (
  data: Omit<AccomplishmentEntity, "id" | "createdAt" | "updatedAt">
): Promise<void> => {
  const accomplishmentId = crypto.randomUUID();
  try {
    const accomplishmentRef = doc(collection(db, tablename), accomplishmentId);
    await setDoc(accomplishmentRef, {
      ...data,
      id: accomplishmentId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    } as AccomplishmentEntity);
  } catch (error) {
    console.error("Error adding accomplishment:", error);
  }
};

export const getAccomplishmentsByCity = async (
  cityId: string
): Promise<AccomplishmentEntity[]> => {
  try {
    const accomplishmentsRef = collection(db, tablename);
    const q = query(accomplishmentsRef, where("cityId", "==", cityId));
    const querySnapshot = await getDocs(q);

    const accomplishments: AccomplishmentEntity[] = [];
    querySnapshot.forEach((doc) => {
      accomplishments.push(doc.data() as AccomplishmentEntity);
    });

    return accomplishments;
  } catch (error) {
    console.error("Error fetching accomplishments by city:", error);
    return [];
  }
};

export const deleteAccomplishment = async (
  accomplishmentId: string
): Promise<void> => {
  try {
    const accomplishmentRef = doc(db, tablename, accomplishmentId);
    await deleteDoc(accomplishmentRef);
  } catch (error) {
    console.error("Error deleting accomplishment:", error);
  }
};

export const updateAccomplishment = async (
  accomplishmentId: string,
  data: Partial<Omit<AccomplishmentEntity, "id" | "createdAt">>
): Promise<void> => {
  try {
    const accomplishmentRef = doc(db, tablename, accomplishmentId);
    await updateDoc(accomplishmentRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating accomplishment:", error);
  }
};

export const getAllAccomplishment = async (): Promise<
  AccomplishmentEntity[]
> => {
  try {
    const accomplishmentCol = collection(db, tablename);
    const querySnapshot = await getDocs(accomplishmentCol);
    const accomplishment: AccomplishmentEntity[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      accomplishment.push({
        cityId: data.cityId,
        createdAt: data.createdAt,
        id: docSnap.id,
        imageUrl: data.imageUrl,
        link: data.link,
        text: data.text,
        title: data.title,
        target: data.target,
        updatedAt: data.updatedAt
      } as AccomplishmentEntity);
    });

    return accomplishment;
  } catch (error) {
    console.error("Erro ao buscar realizações:", error);
    return [];
  }
};
