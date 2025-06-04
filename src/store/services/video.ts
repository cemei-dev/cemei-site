import {
  collection,
  getDocs,
  getFirestore,
  query,
  where
} from "firebase/firestore";

import { VideoEntity } from "@/common/entities/vide";
import firebaseApp from "@/config/firebase";

const db = getFirestore(firebaseApp);
const tableName = "videos";

export const getAllVideos = async (): Promise<VideoEntity[]> => {
  try {
    const videosCol = collection(db, tableName);
    const querySnapshot = await getDocs(videosCol);
    const videos: VideoEntity[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      videos.push({
        createdAt: data.createdAt,
        id: docSnap.id,
        text: data.text,
        title: data.title,
        videoUrl: data.videoUrl
      });
    });

    return videos;
  } catch (error) {
    console.error("Erro ao buscar Vídeos:", error);
    return [];
  }
};

export const getAllCityVideos = async (
  cityId: string
): Promise<VideoEntity[]> => {
  try {
    const eventsRef = collection(db, tableName);
    const q = query(eventsRef, where("cityId", "==", cityId));
    const querySnapshot = await getDocs(q);

    const cityVideos: VideoEntity[] = [];
    querySnapshot.forEach((doc) => {
      cityVideos.push(doc.data() as VideoEntity);
    });

    return cityVideos;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
