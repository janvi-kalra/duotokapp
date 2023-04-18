import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wordList } from '../assets/dictionary/friendsDictionary';

const DictionaryModal = ({ word }) => {
  const definition = wordList[word]
  return (
    <View style={styles.container}>
      <View style={styles.wordContainer}>
        <Text style={styles.wordText}>{word}</Text>
      </View>
      <View style={styles.definitionContainer}>
        <Text style={styles.definitionText}>{definition}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 30,
    // height: '100%', 
    // width: '100%', 
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    // padding: 10,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: "center",
  },
  wordContainer: {
    alignItems: 'center',
  },
  wordText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    // color: '#fff',
    color: '#000'

  },
  definitionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  definitionText: {
    fontSize: 18,
    lineHeight: 24,
  },
});

export default DictionaryModal;
