import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useThemeColor } from '../hooks/use-theme-color';

interface FilterOption {
  id: string;
  label: string;
  code: string;
  type: 'code' | 'name';
}

interface FilterBarProps {
  options: FilterOption[];
  onFilterChange?: (selectedIds: string[]) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ options, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Combinar subcategoría con código y eliminar duplicados
  const combinedOptions = useMemo(() => {
    const map = new Map<string, string>(); // id -> label
    options.forEach(opt => {
      if (!map.has(opt.id)) {
        map.set(opt.id, `${opt.label} (${opt.code})`);
      }
    });
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }));
  }, [options]);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const accentColor = useThemeColor({}, 'accent');
  const cardBackground = useThemeColor({}, 'cardBackground');

  const handleFilterToggle = (id: string) => {
    const newSelected = selectedFilters.includes(id)
      ? selectedFilters.filter(f => f !== id)
      : [...selectedFilters, id];
    setSelectedFilters(newSelected);
    onFilterChange?.(newSelected);
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
    onFilterChange?.([]);
  };

  const activeCount = selectedFilters.length;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { backgroundColor: cardBackground }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {combinedOptions.map(option => (
            <Pressable
              key={option.id}
              style={[
                styles.filterPill,
                { borderColor: primaryColor },
                selectedFilters.includes(option.id) && { backgroundColor: primaryColor },
              ]}
              onPress={() => handleFilterToggle(option.id)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  { color: selectedFilters.includes(option.id) ? backgroundColor : primaryColor },
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}

          {activeCount > 0 && (
            <Pressable
              style={[styles.clearButton, { backgroundColor: accentColor }]}
              onPress={handleClearFilters}
            >
              <Text style={[styles.clearButtonText, { color: textColor }]}>Limpiar</Text>
            </Pressable>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 20,
    left: 20, // ahora a la izquierda
    zIndex: 100,
    elevation: 10,
  },
  container: {
    borderRadius: 12,
    padding: 8,
    maxWidth: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 50,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '500',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});