import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs
} from "firebase/firestore";

import { CityEntity } from "@/common/entities/city";
import firebaseApp from "@/config/firebase";

const db = getFirestore(firebaseApp);
const tableName = "cities";

export const getCityById = async (
  cityId: string
): Promise<CityEntity | null> => {
  if (cityId === "") return null;

  try {
    const docRef = doc(db, tableName, cityId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const cityData = docSnap.data();
      return {
        id: cityId,
        cityImageUrl: cityData.cityImageUrl,
        name: cityData.name,
        managerId: cityData.managerId,
        email: cityData.email,
        contactEmails: cityData.contactEmails,
        contactPhones: cityData.contactPhones
      } as CityEntity;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar cidade:", error);
    return null;
  }
};

export const updateCity = async (id: string, data: Partial<CityEntity>) => {
  try {
    const cityRef = doc(db, "cities", id);
    await updateDoc(cityRef, data);
    return { error: null };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating city:", error);
    return { error: error.message };
  }
};

export const getAllCities = async (): Promise<CityEntity[]> => {
  try {
    const citiesCol = collection(db, tableName);
    const querySnapshot = await getDocs(citiesCol);
    const cities: CityEntity[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      cities.push({
        id: docSnap.id,
        cityImageUrl: data.cityImageUrl,
        name: data.name,
        managerId: data.managerId,
        email: data.email,
        contactEmails: data.contactEmails,
        contactPhones: data.contactPhones,
        lat: data.lat ?? 0,
        lng: data.lng ?? 0
      });
    });

    return cities;
  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    return [];
  }
};
