"use client";

import { useState } from "react";

import { Timestamp } from "firebase/firestore";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useGetGeneralNews } from "@/hooks/queries/useGetGeneralNews";

import NewsCard from "../NewsCard/newsCard";

export interface NewsItem {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  link: string;
  createdAt: Timestamp;
}

export interface NewsCarouselProps {
  target?: string;
  newsItems?: NewsItem[];
}

export default function NewsCarousel({ target, newsItems }: NewsCarouselProps) {
  const { data: fetchedNews } = useGetGeneralNews(target || "");
  const newsToDisplay = newsItems || fetchedNews;

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!newsToDisplay || newsToDisplay.length === 0) {
    return (
      <div className="mt-20 flex items-center justify-center">
        <p className="text-center text-2xl font-extrabold">
          Nenhuma notícia adicionada
        </p>
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < newsToDisplay.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative w-full lg:px-16">
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-purple-500 p-2 shadow hover:scale-110 lg:block"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
      )}

      <div className="overflow-x-auto scroll-smooth lg:overflow-hidden">
        <div
          className="flex gap-10 lg:gap-0 lg:transition-transform lg:duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {newsToDisplay.map((newsItem: NewsItem) => (
            <div key={newsItem.id} className="w-full flex-shrink-0">
              <NewsCard
                createdAt={newsItem.createdAt}
                imageUrl={newsItem.imageUrl}
                link={newsItem.link}
                text={newsItem.text}
                title={newsItem.title}
              />
            </div>
          ))}
        </div>
      </div>

      {currentIndex < newsToDisplay.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-purple-500 p-2 shadow hover:scale-110 lg:block"
        >
          <ArrowRight className="h-5 w-5 text-white" />
        </button>
      )}
    </div>
  );
}
