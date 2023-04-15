import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from "../styles/global-styles.config";
import { PinwheelIn, withDecay } from 'react-native-reanimated';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const DictionaryModal = ({ visible, selectedWord, definition, setModalVisible }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{selectedWord}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.definitionContainer}>
          <Text style={styles.definition}>{definition}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default DictionaryModal;

const styles = StyleSheet.create({
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 40, 
    backgroundColor: globalStyles.colors.orange,
    position: 'absolute', 
    top: 0, 
    left: 0, 
    height: deviceHeight / 4,
    width: deviceWidth, 
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
  },
  definitionContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: globalStyles.colors.yellow,
    height: '10%', 
  },
  definition: {
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: globalStyles.colors.pink, 
  },
});


// How to make it slide in from top. 
// https://www.youtube.com/watch?v=ysxXKGASMkA&ab_channel=LirsTechTips