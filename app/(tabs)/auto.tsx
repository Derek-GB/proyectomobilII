import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CategoryHeader } from '../../components/CategoryHeader';
import { ImageModal } from '../../components/ImageModal';
import { ProductCard } from '../../components/ProductCard';
import { ProductModal } from '../../components/ProductModal';
import { categories } from '../../constants/autoYCargo';
import { useMultipleCarousels } from '../../hooks/useMultipleCarousels';
import { autoStyles } from '../../styles/auto.styles';

export default function Auto() {
  const allProducts = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        products: category.subcategories.flatMap((sub) =>
          sub.products.map((product) => ({
            ...product,
            category: category.name,
            subcategory: sub.name,
            code: sub.code, // ✅ IMPORTANTE
          }))
        ),
      })),
    []
  );

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedMeasureImage, setSelectedMeasureImage] = useState<any>(null);
  const { carouselIndexes, goToNext, goToPrevious } = useMultipleCarousels();



  const selectedProduct = useMemo(() => {
    for (const category of allProducts) {
      const found = category.products.find((product) => product.id === selectedProductId);
      if (found) return found;
    }
    return null;
  }, [allProducts, selectedProductId]);

  const handleToggleMeasures = (productId: string) => {
    setExpandedId(expandedId === productId ? null : productId);
  };

  return (
    <View style={autoStyles.container}>
      <ScrollView contentContainerStyle={autoStyles.scrollContent}>
        {allProducts.map((category) => (
          <View key={category.name}>
            <CategoryHeader title={category.name} />
            <View style={autoStyles.productsContainer}>
              {category.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  carouselIndex={carouselIndexes[product.id] ?? 0}
                  expandedId={expandedId}
                  onPress={() => setSelectedProductId(product.id)}
                  onToggleMeasures={() => handleToggleMeasures(product.id)}
                  onImagePress={setSelectedMeasureImage}
                  onNextImage={() => goToNext(product.id, product.images?.length || 0)}
                  onPreviousImage={() => goToPrevious(product.id, product.images?.length || 0)}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <ProductModal
        visible={Boolean(selectedProduct)}
        product={selectedProduct}
        carouselIndex={carouselIndexes[selectedProduct?.id ?? ''] ?? 0}
        onClose={() => setSelectedProductId(null)}
      />
      <ImageModal
        visible={Boolean(selectedMeasureImage)}
        imageSource={selectedMeasureImage}
        onClose={() => setSelectedMeasureImage(null)}
      />
    </View>
  );
}