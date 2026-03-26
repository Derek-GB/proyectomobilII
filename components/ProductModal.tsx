import React from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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

export const ProductModal: React.FC<ProductModalProps> = ({
  visible,
  product,
  carouselIndex,
  onClose,
}) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <Pressable style={styles.modalBackdrop} onPress={onClose}>
      <Pressable style={styles.modalCard}>
        {product && (
          <>
            {/* ── Header compacto ── */}
            <View style={styles.modalHeader}>
              <View style={styles.headerAccent} />
              <View style={styles.headerTextBlock}>
                <Text style={styles.modalTitle} numberOfLines={1}>
                  {product.name}
                </Text>
                {product.subtitle && (
                  <Text style={styles.modalSubtitle} numberOfLines={1}>
                    {product.subtitle}
                  </Text>
                )}
              </View>
              <View style={styles.refBadge}>
                <Text style={styles.refText}>REF: {product.id}</Text>
              </View>
              <Pressable onPress={onClose} style={styles.closeIconButton}>
                <Text style={styles.closeIconText}>✕</Text>
              </Pressable>
            </View>

            <View style={styles.divider} />

            {/* ── Cuerpo horizontal: imagen | info ── */}
            <View style={styles.body}>
              {/* Columna izquierda — Imagen */}
              {product.images && product.images.length > 0 && (
                <View style={styles.imageColumn}>
                  <View style={styles.imageWrapper}>
                    <Image
                      source={product.images[carouselIndex]}
                      style={styles.modalImage}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              )}

              {/* Columna derecha — Características + Aplicaciones */}
              <ScrollView
                style={styles.infoColumn}
                contentContainerStyle={styles.infoContent}
                showsVerticalScrollIndicator={false}
              >
                {product.features && product.features.length > 0 && (
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <View style={styles.sectionAccentBar} />
                      <Text style={styles.modalSectionTitle}>Características</Text>
                    </View>
                    <View style={styles.itemsContainer}>
                      {product.features.map((item, index) => (
                        <View key={index} style={styles.itemRow}>
                          <View style={styles.bullet} />
                          <Text style={styles.modalItem}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {product.applications && product.applications.length > 0 && (
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <View style={styles.sectionAccentBar} />
                      <Text style={styles.modalSectionTitle}>Aplicaciones</Text>
                    </View>
                    <View style={styles.itemsContainer}>
                      {product.applications.map((item, index) => (
                        <View key={index} style={styles.itemRow}>
                          <View style={styles.bullet} />
                          <Text style={styles.modalItem}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </ScrollView>
            </View>

            {/* ── Footer ── */}
            <View style={styles.divider} />
            <View style={styles.footer}>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cerrar ficha</Text>
              </Pressable>
            </View>
          </>
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
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 680,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    maxHeight: '80%',
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    overflow: 'hidden',
  },

  /* ── Header ── */
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    gap: 10,
  },
  headerAccent: {
    width: 4,
    height: 32,
    borderRadius: 2,
    backgroundColor: '#111111',
    flexShrink: 0,
  },
  headerTextBlock: {
    flex: 1,
  },
  modalTitle: {
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    lineHeight: 24,
  },
  modalSubtitle: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginTop: 2,
    letterSpacing: 0.3,
  },
  refBadge: {
    backgroundColor: '#CC0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    flexShrink: 0,
  },
  refText: {
    fontFamily: 'Open Sans',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  closeIconButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  closeIconText: {
    fontSize: 13,
    color: '#444444',
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginHorizontal: 18,
  },

  /* ── Body horizontal ── */
  body: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
    minHeight: 260,
    maxHeight: 380,
  },

  /* Columna imagen */
  imageColumn: {
    width: '38%',
    flexShrink: 0,
  },
  imageWrapper: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },

  /* Columna info */
  infoColumn: {
    flex: 1,
  },
  infoContent: {
    gap: 14,
    paddingBottom: 4,
  },

  /* ── Secciones ── */
  section: {
    gap: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  sectionAccentBar: {
    width: 3,
    height: 16,
    backgroundColor: '#111111',
    borderRadius: 2,
  },
  modalSectionTitle: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '700',
    color: '#111111',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  itemsContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    gap: 6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#111111',
    marginTop: 7,
    flexShrink: 0,
  },
  modalItem: {
    fontFamily: 'Open Sans',
    fontSize: 13,
    color: '#333333',
    lineHeight: 19,
    flex: 1,
  },

  /* ── Footer ── */
  footer: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'flex-end',
  },
  closeButton: {
    backgroundColor: '#CC0000',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  closeButtonText: {
    fontFamily: 'Open Sans',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.5,
  },
});