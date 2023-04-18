import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { globalStyles } from "../styles/global-styles.config";
import DictionaryModal from './dictionaryModal';
import { wordList} from '../assets/dictionary/friendsDictionary.js'

const WordPressable = ({ selectedWord, wordWithSyntax, setSelectedWord, setIsModalVisible}) => {
  const clickedOnWord = () => {
    console.log(`clicked on word ${selectedWord}!`)
    setSelectedWord(selectedWord); 
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={clickedOnWord}>
        <Text style={styles.subtitleText}>{wordWithSyntax}</Text>
      </TouchableOpacity>
    </View>  
  );
};

function getWordsWithSyntax(sentence) {
  // Split the sentence into an array of words
  const words = sentence.split(' ');
  // Remove any punctuation marks from the end of each word
  let cleanedWords = words.map((word) => word.replace(/[^\w\s]/gi, ''));
  // Filter out any empty strings
  cleanedWords = cleanedWords.filter((word) => word !== '');

  // Create an array to store each word along with its original syntax
  const wordsWithSyntax = [];

  // Loop through each word in the array
  cleanedWords.forEach((word) => {
    // Find the index of the word in the original sentence
    const startIndex = sentence.indexOf(word);

    // Calculate the length of the word
    const length = word.length;

    // Extract the original syntax of the word from the sentence
    const syntax = sentence.slice(startIndex, startIndex + length + 1);

    // Add the word and its syntax to the array
    wordsWithSyntax.push({ [word]: syntax });
  });

  // Return the final list of words with their syntax
  return wordsWithSyntax;
}

const TextWithPressableWords = ({ text, setIsModalVisible, setSelectedWord }) => {
  const wordsWithSyntax = getWordsWithSyntax(text); 

  return (
    <View style={styles.subtitleContainer}>
      {wordsWithSyntax.map((wordToSyntax, index) => {
        const word = Object.keys(wordToSyntax)[0];
        const wordWithSyntax = wordToSyntax[word];
        const foundWord = wordList.hasOwnProperty(word) 
        if (foundWord) {
          return <WordPressable key={index} selectedWord={word} wordWithSyntax={wordWithSyntax} setIsModalVisible={setIsModalVisible} setSelectedWord={setSelectedWord}/>;
        } else {
          return <Text style={styles.subtitleText} key={index}>{word} </Text>;
        }
      })}
    </View>
  );
};

export default TextWithPressableWords;


const styles = StyleSheet.create({
  subtitleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
  },
  subtitleText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
  // This would be how you highlight words when you want to do that. 
  container: {
    // backgroundColor: globalStyles.colors.orange,
  }
});
