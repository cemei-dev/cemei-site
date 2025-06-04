import {
  collection,
  getDocs,
  getFirestore,
  query,
  where
} from "firebase/firestore";

import { EventEntity } from "@/common/entities/event";
import firebaseApp from "@/config/firebase";

const db = getFirestore(firebaseApp);
const tableName = "events";

export const getEventsByTarget = async (
  target: string
): Promise<EventEntity[]> => {
  try {
    const eventsRef = collection(db, tableName);
    const q = query(eventsRef, where("target", "==", target));
    const querySnapshot = await getDocs(q);

    const generalEvents: EventEntity[] = [];
    querySnapshot.forEach((doc) => {
      generalEvents.push(doc.data() as EventEntity);
    });

    return generalEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const getAllEvents = async (): Promise<EventEntity[]> => {
  try {
    const eventsCol = collection(db, tableName);
    const querySnapshot = await getDocs(eventsCol);
    const events: EventEntity[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      events.push({
        endDate: data.endDate,
        id: docSnap.id,
        imageUrl: data.imageUrl,
        link: data.link,
        startDate: data.startDate,
        text: data.text,
        title: data.title,
        target: data.target,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        initialDate: data.initialDate || null,
        place: data.place || ""
      } as EventEntity);
    });

    return events;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return [];
  }
};
