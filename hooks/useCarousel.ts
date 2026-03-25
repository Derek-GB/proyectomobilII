import { useState } from 'react';

export const useCarousel = (initialIndex: number = 0) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToNext = (totalImages: number) => {
    if (totalImages <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const goToPrevious = (totalImages: number) => {
    if (totalImages <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return { currentIndex, goToNext, goToPrevious };
};