import { StyleSheet } from 'react-native';

export const autoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  // 🔻 Quitamos espacio innecesario arriba y reducimos abajo
  scrollContent: {
    paddingTop: 0,
    paddingBottom: 10, // antes 24 (muy grande)
  },

  // 🔻 Quitamos margen superior implícito y reducimos separación
  productsContainer: {
    marginHorizontal: 10,
    marginBottom: 8,  // antes 10
    marginTop: 0,     // 🔥 importante para pegarlo al logo
    paddingTop: 0,    // por si acaso

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});