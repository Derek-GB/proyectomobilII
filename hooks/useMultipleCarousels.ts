import { useState } from 'react';

export const useMultipleCarousels = () => {
  const [carouselIndexes, setCarouselIndexes] = useState<Record<string, number>>({});

  const goToNext = (productId: string, totalImages: number) => {
    if (totalImages <= 1) return;
    setCarouselIndexes((prev) => ({
      ...prev,
      [productId]: ((prev[productId] ?? 0) + 1) % totalImages,
    }));
  };

  const goToPrevious = (productId: string, totalImages: number) => {
    if (totalImages <= 1) return;
    setCarouselIndexes((prev) => ({
      ...prev,
      [productId]: ((prev[productId] ?? 0) - 1 + totalImages) % totalImages,
    }));
  };

  return { carouselIndexes, goToNext, goToPrevious };
};