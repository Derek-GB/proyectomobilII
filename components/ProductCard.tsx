import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface Product {
  id: string;
  name: string;
  code?: string;
  subtitle?: string;
  description?: string;
  images?: any[];
  measuresImages?: any[];
}

interface ProductCardProps {
  product: Product;
  carouselIndex: number;
  expandedId: string | null;
  onPress: () => void;
  onToggleMeasures: () => void;
  onImagePress: (image: any) => void;
  onNextImage: () => void;
  onPreviousImage: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  carouselIndex,
  expandedId,
  onPress,
  onToggleMeasures,
  onImagePress,
  onNextImage,
  onPreviousImage,
}) => {
  const images = product.images ?? [];
  const currentImage = images[carouselIndex];
  const hasManyImages = images.length > 1;

  return (
    <View style={styles.card}>
      <View style={styles.imageCarousel}>
        {hasManyImages && (
          <Pressable style={styles.carouselArrowLeft} onPress={onPreviousImage}>
            <Text style={styles.carouselArrowText}>‹</Text>
          </Pressable>
        )}
        <Pressable onPress={onPress} style={styles.imageTapArea}>
          {currentImage ? (
            <Image source={currentImage} style={styles.image} resizeMode="contain" />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>Sin imagen</Text>
            </View>
          )}
        </Pressable>
        {hasManyImages && (
          <Pressable style={styles.carouselArrowRight} onPress={onNextImage}>
            <Text style={styles.carouselArrowText}>›</Text>
          </Pressable>
        )}
      </View>
      {hasManyImages && (
        <View style={styles.carouselDots}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[styles.carouselDot, index === carouselIndex && styles.carouselDotActive]}
            />
          ))}
        </View>
      )}
      <Pressable onPress={onPress}>
        <Text style={styles.productName}>{product.name}</Text>
        {product.code && <Text style={styles.productCode}>{product.code}</Text>}
        {product.subtitle && <Text style={styles.productSubtitle}>{product.subtitle}</Text>}
        {product.description && <Text style={styles.description}>{product.description}</Text>}
      </Pressable>
      {expandedId === product.id && (
        <View style={styles.measureContainer}>
          <Text style={styles.measureHeader}>Medidas del producto</Text>
          {product.measuresImages && product.measuresImages.length > 0 ? (
            <View>
              {product.measuresImages.map((img, index) => (
                <Pressable key={index} onPress={() => onImagePress(img)}>
                  <Image source={img} style={styles.measureImage} resizeMode="contain" />
                </Pressable>
              ))}
            </View>
          ) : (
            <Text style={styles.measureRow}>Sin medidas disponibles.</Text>
          )}
        </View>
      )}
      <Pressable onPress={onToggleMeasures} style={styles.measureToggle}>
        <Text style={styles.measureToggleText}>
          {expandedId === product.id ? 'Ocultar medidas' : 'Ver medidas'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '30%',
    padding: 10,
    marginVertical: 12,
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
    minHeight: 360,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'space-between',
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
  imageCarousel: {
    position: 'relative',
    width: '100%',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  carouselArrowText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 6,
    gap: 4,
  },
  carouselDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B3B3B3',
  },
  carouselDotActive: { backgroundColor: '#D32F2F' },
  productName: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    marginBottom: 4,
    color: '#000000',
    fontWeight: '600',
    textAlign: 'center',
  },
  productCode: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    color: '#D32F2F',
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 2,
  },
  productSubtitle: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Open Sans',
    fontSize: 12,
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
    color: '#FFF',
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
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333333',
  },
  measureRow: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    color: '#333333',
    marginBottom: 2,
  },
  measureImage: {
    width: '100%',
    height: 120,
    marginBottom: 6,
    borderRadius: 6,
  },
});