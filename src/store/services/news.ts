import {
  collection,
  getDocs,
  getFirestore,
  query,
  where
} from "firebase/firestore";

import { NewsEntity } from "@/common/entities/news";
import firebaseApp from "@/config/firebase";

const db = getFirestore(firebaseApp);
const tablename = "news";

export const getNewsByTarget = async (
  target: string
): Promise<NewsEntity[]> => {
  try {
    const newsRef = collection(db, tablename);
    const q = query(newsRef, where("target", "==", target));
    const querySnapshot = await getDocs(q);
    const generalNews: NewsEntity[] = [];
    querySnapshot.forEach((doc) => {
      generalNews.push(doc.data() as NewsEntity);
    });

    return generalNews;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export const getAllNews = async (): Promise<NewsEntity[]> => {
  try {
    const newsCol = collection(db, tablename);
    const querySnapshot = await getDocs(newsCol);
    const news: NewsEntity[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      news.push({
        createdAt: data.createdAt,
        id: docSnap.id,
        imageUrl: data.imageUrl,
        link: data.link,
        text: data.text,
        title: data.title,
        target: data.target
      } as NewsEntity);
    });

    return news;
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
};
