import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CategoryHeader } from '../../components/CategoryHeader';
import { ImageModal } from '../../components/ImageModal';
import { ProductCard } from '../../components/ProductCard';
import { ProductModal } from '../../components/ProductModal';
import { SearchBar } from '../../components/SearchBar';
import { categories } from '../../constants/autoYCargo';
import { useMultipleCarousels } from '../../hooks/useMultipleCarousels';
import { autoStyles } from '../../styles/auto.styles';

const FILTER_CATEGORIES = [
  { id: '04.01', label: '04.01 Abrazaderas' },
  { id: '04.02', label: '04.02 Arandelas de estanqueidad' },
  { id: '04.03', label: '04.03 Grapas' },
  { id: '04.04', label: '04.04 Útiles de automoción' },
  { id: '04.05', label: '04.05 Almacenaje' },
];

const DRAWER_WIDTH = 220;

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
            code: sub.code,
          }))
        ),
      })),
    []
  );

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedMeasureImage, setSelectedMeasureImage] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { carouselIndexes, goToNext, goToPrevious } = useMultipleCarousels();

  const drawerAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 280,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: DRAWER_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const clearFilters = () => setSelectedFilters([]);

  const selectedProduct = useMemo(() => {
    for (const category of allProducts) {
      const found = category.products.find((product) => product.id === selectedProductId);
      if (found) return found;
    }
    return null;
  }, [allProducts, selectedProductId]);

  const filteredProducts = useMemo(() => {
    const lowerSearch = searchText.toLowerCase().trim();

    return allProducts
      .map((category) => ({
        ...category,
        products: category.products.filter((product) => {
          const matchesSearch =
            !lowerSearch ||
            product.name.toLowerCase().includes(lowerSearch) ||
            product.code?.toLowerCase().includes(lowerSearch);

          const matchesFilter =
            selectedFilters.length === 0 ||
            selectedFilters.some((f) => product.code?.startsWith(f));

          return matchesSearch && matchesFilter;
        }),
      }))
      .filter((category) => category.products.length > 0);
  }, [allProducts, searchText, selectedFilters]);

  const handleToggleMeasures = (productId: string) => {
    setExpandedId(expandedId === productId ? null : productId);
  };

  return (
    <View style={autoStyles.container}>
      <ScrollView contentContainerStyle={autoStyles.scrollContent}>
        {filteredProducts.map((category) => (
          <View key={category.name}>
            <CategoryHeader title={category.name} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingHorizontal: 0,
                gap: 0,
              }}
            >
              <RNImage
                style={{
                  width: 110,
                  height: 110,
                  marginHorizontal: 10,
                  marginTop: 0,
                  marginBottom: 0,
                }}
                source={require('../../assets/images/icon wurth.png')}
                resizeMode="contain"
              />
              <SearchBar placeholder="Producto..." onSearch={setSearchText} />

              {/* Botón para abrir/cerrar el drawer */}
              <TouchableOpacity
                style={filterStyles.filterButton}
                onPress={drawerOpen ? closeDrawer : openDrawer}
                activeOpacity={0.75}
              >
                <Text style={filterStyles.filterButtonIcon}>Filtrar</Text>
                {selectedFilters.length > 0 && (
                  <View style={filterStyles.badge}>
                    <Text style={filterStyles.badgeText}>{selectedFilters.length}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

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

      {/* Overlay oscuro detrás del drawer */}
      {drawerOpen && (
        <TouchableOpacity
          style={filterStyles.overlay}
          activeOpacity={1}
          onPress={closeDrawer}
        />
      )}

      {/* Drawer deslizante desde la derecha */}
      <Animated.View
        style={[
          filterStyles.drawer,
          { transform: [{ translateX: drawerAnim }] },
        ]}
      >
        <View style={filterStyles.drawerHeader}>
          <Text style={filterStyles.drawerTitle}>Filtrar por</Text>
          <TouchableOpacity onPress={closeDrawer}>
            <Text style={filterStyles.closeBtn}>✕</Text>
          </TouchableOpacity>
        </View>

        {FILTER_CATEGORIES.map((item) => {
          const active = selectedFilters.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={[filterStyles.filterItem, active && filterStyles.filterItemActive]}
              onPress={() => toggleFilter(item.id)}
              activeOpacity={0.7}
            >
              <View style={[filterStyles.checkbox, active && filterStyles.checkboxActive]}>
                {active && <Text style={filterStyles.checkmark}>✓</Text>}
              </View>
              <Text
                style={[filterStyles.filterLabel, active && filterStyles.filterLabelActive]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {selectedFilters.length > 0 && (
          <TouchableOpacity style={filterStyles.clearBtn} onPress={clearFilters}>
            <Text style={filterStyles.clearBtnText}>Limpiar filtros</Text>
          </TouchableOpacity>
        )}
      </Animated.View>

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

const filterStyles = StyleSheet.create({
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#D32F2F',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginRight: 10,
  },
  filterButtonIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Open Sans',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#222',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: 10,
  },
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    zIndex: 20,
    paddingTop: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: -3, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  drawerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  closeBtn: {
    fontSize: 18,
    color: '#888',
    paddingHorizontal: 4,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#f5f5f5',
  },
  filterItemActive: {
    backgroundColor: '#fff0f0',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxActive: {
    borderColor: '#CC0000',
    backgroundColor: '#CC0000',
  },
  checkmark: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 15,
  },
  filterLabel: {
    fontSize: 13,
    color: '#444',
    flexShrink: 1,
  },
  filterLabelActive: {
    color: '#CC0000',
    fontWeight: '600',
  },
  clearBtn: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#CC0000',
    alignItems: 'center',
  },
  clearBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
});