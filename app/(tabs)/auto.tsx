import React, { useMemo, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { categories } from '../../constants/autoYCargo';

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
  const [carouselIndexes, setCarouselIndexes] = useState<Record<string, number>>({});

  const goToNextImage = (productId: string, totalImages: number) => {
    if (totalImages <= 1) return;

    setCarouselIndexes((prev) => {
      const currentIndex = prev[productId] ?? 0;
      return {
        ...prev,
        [productId]: (currentIndex + 1) % totalImages,
      };
    });
  };

  const goToPreviousImage = (productId: string, totalImages: number) => {
    if (totalImages <= 1) return;

    setCarouselIndexes((prev) => {
      const currentIndex = prev[productId] ?? 0;
      return {
        ...prev,
        [productId]: (currentIndex - 1 + totalImages) % totalImages,
      };
    });
  };

  const selectedProduct = useMemo(() => {
    for (const category of allProducts) {
      const found = category.products.find(
        (product: any) => product.id === selectedProductId
      );
      if (found) return found;
    }
    return null;
  }, [allProducts, selectedProductId]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {allProducts.map((category) => (
          <View key={category.name} style={styles.category}>
            <Text style={styles.categoryTitle}>{category.name}</Text>

            <View style={styles.productsContainer}>
              {category.products.map((product: any) => {
                const currentImageIndex = carouselIndexes[product.id] ?? 0;
                const currentImage = product.images?.[currentImageIndex];
                const hasManyImages = product.images?.length > 1;

                return (
                  <View key={product.id} style={styles.card}>
                    {/* 🔥 CAROUSEL */}
                    <View style={styles.imageCarousel}>
                      {hasManyImages && (
                        <Pressable
                          style={styles.carouselArrowLeft}
                          onPress={() =>
                            goToPreviousImage(product.id, product.images?.length || 0)
                          }
                        >
                          <Text style={styles.carouselArrowText}>‹</Text>
                        </Pressable>
                      )}

                      <Pressable
                        onPress={() => setSelectedProductId(product.id)}
                        style={styles.imageTapArea}
                      >
                        {currentImage ? (
                          <Image
                            source={currentImage}
                            style={styles.image}
                            resizeMode="contain"
                          />
                        ) : (
                          <View style={styles.placeholderImage}>
                            <Text style={styles.placeholderText}>Sin imagen</Text>
                          </View>
                        )}
                      </Pressable>

                      {hasManyImages && (
                        <Pressable
                          style={styles.carouselArrowRight}
                          onPress={() =>
                            goToNextImage(product.id, product.images?.length || 0)
                          }
                        >
                          <Text style={styles.carouselArrowText}>›</Text>
                        </Pressable>
                      )}
                    </View>

                    {/* DOTS */}
                    {hasManyImages && (
                      <View style={styles.carouselDots}>
                        {product.images?.map((_: any, index: number) => (
                          <View
                            key={index}
                            style={[
                              styles.carouselDot,
                              index === currentImageIndex &&
                                styles.carouselDotActive,
                            ]}
                          />
                        ))}
                      </View>
                    )}

                    {/* 🔥 INFO */}
                    <Pressable onPress={() => setSelectedProductId(product.id)}>
                      <Text style={styles.productName}>{product.name}</Text>

                      {/* ✅ CODE */}
                      <Text style={styles.productCode}>
                        {product.code}
                      </Text>

                      {/* ✅ SUBTITLE */}
                      {product.subtitle && (
                        <Text style={styles.productSubtitle}>
                          {product.subtitle}
                        </Text>
                      )}

                      <Text style={styles.description}>
                        {product.description}
                      </Text>
                    </Pressable>

                    {/* 🔥 MEDIDAS */}
                    <Pressable
                      onPress={() =>
                        setExpandedId(
                          expandedId === product.id ? null : product.id
                        )
                      }
                      style={styles.measureToggle}
                    >
                      <Text style={styles.measureToggleText}>
                        {expandedId === product.id
                          ? 'Ocultar medidas'
                          : 'Ver medidas'}
                      </Text>
                    </Pressable>

                    {expandedId === product.id && (
                      <View style={styles.measureContainer}>
                        <Text style={styles.measureHeader}>
                          Medidas del producto
                        </Text>

                        {product.measuresImages?.length > 0 ? (
                          product.measuresImages.map(
                            (img: any, index: number) => (
                              <Pressable
                                key={index}
                                onPress={() => setSelectedMeasureImage(img)}
                              >
                                <Image
                                  source={img}
                                  style={styles.measureImage}
                                  resizeMode="contain"
                                />
                              </Pressable>
                            )
                          )
                        ) : (
                          <Text style={styles.measureRow}>
                            Sin medidas disponibles.
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 🔥 MODAL PRODUCTO */}
      <Modal
        visible={Boolean(selectedProduct)}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedProductId(null)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setSelectedProductId(null)}
        >
          <Pressable style={styles.modalCard}>
            {selectedProduct && (
              <>
                {selectedProduct.images && selectedProduct.images.length > 0 && (
                  <Image
                    source={
                      selectedProduct.images[
                        carouselIndexes[selectedProduct.id] ?? 0
                      ]
                    }
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                )}

                <Text style={styles.modalTitle}>
                  {selectedProduct.name}
                </Text>

                {selectedProduct.subtitle && (
                  <Text style={styles.modalSubtitle}>
                    {selectedProduct.subtitle}
                  </Text>
                )}

                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <>
                    <Text style={styles.modalSectionTitle}>
                      Características
                    </Text>
                    {selectedProduct.features.map(
                      (item: string, index: number) => (
                        <Text key={index} style={styles.modalItem}>
                          • {item}
                        </Text>
                      )
                    )}
                  </>
                )}

                {selectedProduct.applications && selectedProduct.applications.length > 0 && (
                  <>
                    <Text style={styles.modalSectionTitle}>
                      Aplicaciones
                    </Text>
                    {selectedProduct.applications.map(
                      (item: string, index: number) => (
                        <Text key={index} style={styles.modalItem}>
                          • {item}
                        </Text>
                      )
                    )}
                  </>
                )}

                <Pressable
                  onPress={() => setSelectedProductId(null)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      {/* 🔥 MODAL IMAGEN MEDIDAS */}
      <Modal
        visible={Boolean(selectedMeasureImage)}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedMeasureImage(null)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setSelectedMeasureImage(null)}
        >
          <Image
            source={selectedMeasureImage}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },
  scrollContent: { paddingBottom: 24 },

  category: { marginBottom: 20 },

  categoryTitle: {
    padding: 10,
    backgroundColor: '#000',
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  productsContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '30%',
    padding: 10,
    marginVertical: 12,
    backgroundColor: '#FFF',
    minHeight: 360,
    borderRadius: 12,
    elevation: 3,
  },

  image: { width: '100%', height: 140, borderRadius: 8 },

  placeholderImage: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderText: {
    color: '#999',
    fontSize: 12,
  },

  imageCarousel: { position: 'relative', alignItems: 'center' },

  imageTapArea: { width: '100%' },

  carouselArrowLeft: {
    position: 'absolute',
    left: 4,
    top: '40%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  carouselArrowRight: {
    position: 'absolute',
    right: 4,
    top: '40%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  carouselArrowText: { color: '#FFF', fontWeight: '700' },

  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 6,
  },

  carouselDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B3B3B3',
    marginHorizontal: 2,
  },

  carouselDotActive: { backgroundColor: '#D32F2F' },

  productName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  productCode: {
    fontSize: 10,
    color: '#D32F2F',
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 2,
  },

  productSubtitle: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
    marginBottom: 4,
  },

  description: { fontSize: 10, color: '#7A7A7A' },

  measureToggle: {
    marginTop: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#D32F2F',
  },

  measureToggleText: {
    color: '#FFF',
    fontSize: 11,
    textAlign: 'center',
  },

  measureContainer: {
    marginTop: 8,
    backgroundColor: '#F9F9F9',
    padding: 6,
  },

  measureHeader: {
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },

  measureRow: { fontSize: 10 },

  measureImage: {
    width: '100%',
    height: 120,
    marginBottom: 6,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },

  modalCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },

  modalImage: { width: '100%', height: 160 },

  modalTitle: { fontSize: 20, fontWeight: '700' },
  modalSubtitle: { fontSize: 14, marginBottom: 10 },

  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },

  modalItem: { fontSize: 13 },

  closeButton: {
    marginTop: 16,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
  },

  closeButtonText: { color: '#FFF', textAlign: 'center' },

  fullImage: {
    width: '95%',
    height: '85%',
    alignSelf: 'center',
  },
});