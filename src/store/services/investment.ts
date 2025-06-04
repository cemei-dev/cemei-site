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

import { InvestmentEntity } from "@/common/entities/investment";
import firebaseApp from "@/config/firebase";
const db = getFirestore(firebaseApp);
const tablename = "investments";

export const addInvestment = async (
  data: Omit<InvestmentEntity, "id" | "createdAt" | "updatedAt">
) => {
  const investmentId = crypto.randomUUID();
  try {
    const investmentRef = doc(collection(db, tablename), investmentId);
    await setDoc(investmentRef, {
      ...data,
      id: investmentId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    } as InvestmentEntity);
  } catch (error) {
    console.error("Error adding investment:", error);
  }
};

export const getInvestmentsByCity = async (
  cityId: string
): Promise<InvestmentEntity[]> => {
  try {
    const investmentsRef = collection(db, tablename);
    const q = query(investmentsRef, where("cityId", "==", cityId));
    const querySnapshot = await getDocs(q);

    const investments: InvestmentEntity[] = [];
    querySnapshot.forEach((doc) => {
      investments.push(doc.data() as InvestmentEntity);
    });

    return investments;
  } catch (error) {
    console.error("Error fetching investments by city:", error);
    return [];
  }
};

export const deleteInvestment = async (investmentId: string): Promise<void> => {
  try {
    const investmentRef = doc(db, tablename, investmentId);
    await deleteDoc(investmentRef);
  } catch (error) {
    console.error("Error deleting investment:", error);
  }
};

export const updateInvestment = async (
  investmentId: string,
  data: Partial<Omit<InvestmentEntity, "id" | "createdAt">>
): Promise<void> => {
  try {
    const investmentRef = doc(db, tablename, investmentId);
    await updateDoc(investmentRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating investment:", error);
  }
};
