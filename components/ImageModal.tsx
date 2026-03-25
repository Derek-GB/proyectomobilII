import React from 'react';
import { Image, Modal, Pressable, StyleSheet, View } from 'react-native';

interface ImageModalProps {
  visible: boolean;
  imageSource: any;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ visible, imageSource, onClose }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <Pressable style={styles.imageModalBackdrop} onPress={onClose}>
      <View style={styles.imageModalContent}>
        <Image source={imageSource} style={styles.imageModalImage} resizeMode="contain" />
      </View>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  imageModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageModalContent: {
    width: '95%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageModalImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});