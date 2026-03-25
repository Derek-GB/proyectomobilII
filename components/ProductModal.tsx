import React from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text } from 'react-native';

interface Product {
  id: string;
  name: string;
  subtitle?: string;
  images?: any[];
  features?: string[];
  applications?: string[];
}

interface ProductModalProps {
  visible: boolean;
  product: Product | null;
  carouselIndex: number;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ visible, product, carouselIndex, onClose }) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <Pressable style={styles.modalBackdrop} onPress={onClose}>
      <Pressable style={styles.modalCard}>
        {product && (
          <ScrollView contentContainerStyle={styles.modalContent}>
            {product.images && product.images.length > 0 && (
              <Image
                source={product.images[carouselIndex]}
                style={styles.modalImage}
                resizeMode="contain"
              />
            )}
            <Text style={styles.modalTitle}>{product.name}</Text>
            {product.subtitle && <Text style={styles.modalSubtitle}>{product.subtitle}</Text>}
            {product.features && product.features.length > 0 && (
              <>
                <Text style={styles.modalSectionTitle}>Características</Text>
                {product.features.map((item, index) => (
                  <Text key={index} style={styles.modalItem}>• {item}</Text>
                ))}
              </>
            )}
            {product.applications && product.applications.length > 0 && (
              <>
                <Text style={styles.modalSectionTitle}>Aplicaciones</Text>
                {product.applications.map((item, index) => (
                  <Text key={index} style={styles.modalItem}>• {item}</Text>
                ))}
              </>
            )}
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </Pressable>
          </ScrollView>
        )}
      </Pressable>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    maxHeight: '88%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  modalContent: {
    paddingBottom: 20,
  },
  modalImage: {
    width: '100%',
    height: 190,
    borderRadius: 12,
    marginBottom: 14,
  },
  modalTitle: {
    fontFamily: 'Open Sans',
    fontSize: 22,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '600',
    color: '#444444',
    marginBottom: 12,
  },
  modalSectionTitle: {
    fontFamily: 'Open Sans',
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
    marginTop: 10,
    marginBottom: 6,
  },
  modalItem: {
    fontFamily: 'Open Sans',
    fontSize: 15,
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
    fontFamily: 'Open Sans',
    color: '#FFFFFF',
    fontWeight: '700',
  },
});