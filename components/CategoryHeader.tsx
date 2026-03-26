import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CategoryHeaderProps {
  title: string;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title }) => (
  <View style={styles.category}>
    <Text style={styles.categoryTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  category: {
    marginBottom: 2, // 🔻 más pegado
  },

  categoryTitle: {
    paddingVertical: 6,   // 🔻 antes 10 (reduce altura)
    paddingHorizontal: 10,

    backgroundColor: '#000000',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Open Sans',
  },
});