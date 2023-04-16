import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { wordList} from '../assets/dictionary/friendsDictionary.js'

const DictionaryModal = ({ selectedWord }) => {
  const [expanded, setExpanded] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const definition = wordList[selectedWord]

  const handleExpand = () => {
    Animated.timing(slideAnimation, {
      toValue: expanded ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setExpanded(!expanded));
  };

  return (
    <TouchableOpacity onPress={handleExpand}>
      <View style={styles.container}>
        <Text style={styles.word}>{selectedWord}</Text>
        {expanded && (
          <Animated.View
            style={[
              styles.definitionContainer,
              { transform: [{ translateY: slideAnimation.interpolate({ inputRange: [0, 1], outputRange: [0, -150] }) }] },
            ]}
          >
            <Text style={styles.definition}>{definition}</Text>
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  word: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  definitionContainer: {
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  definition: {
    fontSize: 18,
    color: '#333',
  },
});

export default DictionaryModal;
