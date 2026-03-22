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

import { categories } from '../../constants/anclaje';

export default function Anclajes() {
  const allProducts = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        products: category.subcategories.flatMap((sub) =>
          sub.products.map((product) => ({
            ...product,
            category: category.name,
            subcategory: sub.name,
            code: sub.code,
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
                const images = product.images ?? [];
                const currentImageIndex = carouselIndexes[product.id] ?? 0;
                const currentImage = images[currentImageIndex];
                const hasManyImages = images.length > 1;

                return (
                  <View key={product.id} style={styles.card}>
                    {/* 🔥 CAROUSEL */}
                    <View style={styles.imageCarousel}>
                      {hasManyImages && (
                        <Pressable
                          style={styles.carouselArrowLeft}
                          onPress={() =>
                            goToPreviousImage(product.id, images.length)
                          }
                        >
                          <Text style={styles.carouselArrowText}>‹</Text>
                        </Pressable>
                      )}

                      <Pressable
                        onPress={() => setSelectedProductId(product.id)}
                        style={styles.imageTapArea}
                      >
                        {currentImage && (
                          <Image
                            source={currentImage}
                            style={styles.image}
                            resizeMode="contain"
                          />
                        )}
                      </Pressable>

                      {hasManyImages && (
                        <Pressable
                          style={styles.carouselArrowRight}
                          onPress={() =>
                            goToNextImage(product.id, images.length)
                          }
                        >
                          <Text style={styles.carouselArrowText}>›</Text>
                        </Pressable>
                      )}
                    </View>

                    {/* DOTS */}
                    {hasManyImages && (
                      <View style={styles.carouselDots}>
                        {images.map((_: any, index: number) => (
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

                      {/* CODE */}
                      {product.code && (
                        <Text style={styles.productCode}>
                          {product.code}
                        </Text>
                      )}

                      {/* SUBTITLE */}
                      {product.subtitle && (
                        <Text style={styles.productSubtitle}>
                          {product.subtitle}
                        </Text>
                      )}

                      {/* DESCRIPTION */}
                      {product.description && (
                        <Text style={styles.description}>
                          {product.description}
                        </Text>
                      )}
                    </Pressable>

                    {/* MEDIDAS */}
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

      {/* 🔥 MODAL */}
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
                {selectedProduct.images?.[0] && (
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

                {/* FEATURES */}
                {selectedProduct.features?.length > 0 && (
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

                {/* APPLICATIONS */}
                {selectedProduct.applications?.length > 0 && (
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

      {/* MODAL IMAGEN */}
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
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  category: {
    marginBottom: 20,
  },
  categoryTitle: {
    padding: 10,
    backgroundColor: '#000000',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  productsContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // 🔥 CARD MEJORADA (3 POR FILA)
  card: {
    width: '30%', // ⬅️ 3 por fila pero menos anchas
    padding: 10,
    marginVertical: 12,
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
    minHeight: 360, // ⬅️ más altas
    borderRadius: 12,

    // sombras
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    justifyContent: 'space-between',
  },

  // 🔥 IMAGEN MÁS GRANDE (clave para verticalidad)
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
  },

  imageCarousel: {
    position: 'relative',
    width: '100%',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTapArea: {
    width: '100%',
  },

  carouselArrowLeft: {
    position: 'absolute',
    left: 4,
    top: '40%',
    zIndex: 2,
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
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselArrowText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 6,
    gap: 4,
  },
  carouselDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B3B3B3',
  },
  carouselDotActive: {
    backgroundColor: '#D32F2F',
  },

  productName: {
    fontSize: 12,
    marginBottom: 4,
    color: '#000000',
    fontWeight: '600',
    textAlign: 'center',
  },
  price: {
    color: '#D32F2F',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    fontSize: 10,
    textAlign: 'left',
    color: '#7A7A7A',
  },

  measureToggle: {
    marginTop: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#D32F2F',
  },
  measureToggleText: {
    color: '#FFFFFF',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '600',
  },

  measureContainer: {
    marginTop: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 6,
    padding: 6,
  },
  measureHeader: {
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333333',
  },
  measureRow: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 2,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    maxHeight: '90%',
  },
  modalImage: {
    width: '100%',
    height: 160,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 10,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginTop: 8,
    marginBottom: 6,
  },
  modalItem: {
    fontSize: 13,
    color: '#333333',
    marginBottom: 4,
  },
  closeButton: {
    marginTop: 16,
    alignSelf: 'flex-end',
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});