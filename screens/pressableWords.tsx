import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { globalStyles } from "../styles/global-styles.config";
import DictionaryModal from './dictionaryModal';


const wordList = [
  { word: 'Oye', definition: '<def here>' },
  // { word: 'Ya', definition: 'A framework for building native apps using React.' },
  // { word: 'No', definition: 'A dialog box or popup window that is displayed on top of the current page.' },
];

const WordPressable = ({ selectedWord, definition, wordWithSyntax}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // const hideModal = () => {
  //   setIsModalVisible(false);
  // };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showModal}>
        <Text style={styles.subtitleText}>{wordWithSyntax}</Text>
      </TouchableOpacity>
      <DictionaryModal selectedWord={selectedWord} definition={definition} visible={isModalVisible} setModalVisible={setIsModalVisible}/> 
    </View>  
  );
};

function getWords(sentence) {
  // Split the sentence into an array of words
  const words = sentence.split(' ');
  // Remove any punctuation marks from the end of each word
  const cleanedWords = words.map((word) => word.replace(/[^\w\s]/gi, ''));
  // Filter out any empty strings
  const filteredWords = cleanedWords.filter((word) => word !== '');
  // Return the final list of words
  return filteredWords;
}

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

const TextWithPressableWords = ({ text }) => {
  const wordsWithSyntax = getWordsWithSyntax(text); 

  return (
    <View style={styles.subtitleContainer}>
      {wordsWithSyntax.map((wordToSyntax, index) => {
        const word = Object.keys(wordToSyntax)[0];
        const wordWithSyntax = wordToSyntax[word];
        const foundWord = wordList.find((w) => w.word.toLowerCase() === word.toLowerCase());
        if (foundWord) {
          return <WordPressable key={index} selectedWord={foundWord.word} definition={foundWord.definition} wordWithSyntax={wordWithSyntax} />;
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
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    // backgroundColor: globalStyles.colors.orange,
    padding: 10,
    // height: '30%', 
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
    backgroundColor: globalStyles.colors.orange,
  }
});
