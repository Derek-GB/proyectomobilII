import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface SearchBarProps {
  onSearch?: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Buscar...' 
}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch?.(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        value={searchText}
        onChangeText={setSearchText}
      />
      <Pressable style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    gap: 8,
    paddingVertical: 4,
  },
  input: {
    flex: 0.7,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    fontSize: 13,
    fontFamily: 'Open Sans',
    color: '#000000',
    borderWidth: 1,
    borderColor: '#D32F2F',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#D32F2F',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Open Sans',
  },
});
