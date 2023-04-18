import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons, Entypo, Foundation } from "@expo/vector-icons";
import { globalStyles } from "../styles/global-styles.config";
import * as ScreenOrientation from "expo-screen-orientation";
import VideoPlayer from "./video-player";
import TextWithPressableWords from "./pressableWords";
import DictionaryModal from "./dictionaryModal";
import { useNavigation } from "@react-navigation/native";


const VideoContainer = ({ route }) => {
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const navigation = useNavigation();
  const subtitles = require('../assets/subtitles/FriendsVideo.json')

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState(false);

  const calculateCurrentSubtitle = useCallback((videoStatus) => {
    setCurrentTime(videoStatus?.positionMillis / 1000);
    const currentSubtitleIndex = subtitles.findIndex(
      (subtitle) => {
        if (currentTime >= subtitle.start && currentTime <= subtitle.end) {
          return subtitle;
        }
      }
    );
    if (currentSubtitleIndex >= 0) {
      setCurrentSubtitle(subtitles[currentSubtitleIndex].text);
    } else {
      setCurrentSubtitle('');
    }
  }, [currentTime]);


  return ( 
    <View style={styles.container}> 
      {/* Back Button */}
      <TouchableOpacity
          style={styles.back}
          onPress={() => {
            navigation.goBack();
          }}
        >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Definition Modal */}
      {isModalVisible &&
      <View style={styles.dictionaryContainer}> 
        <DictionaryModal word={selectedWord}/> 
      </View> 
      }

      <View style={styles.videoPlayerContainer}>   
        <VideoPlayer route={route} calculateCurrentSubtitle={calculateCurrentSubtitle}/>
      </View> 

      {/* Subtitles */}
      {currentSubtitle && 
        <View style={styles.subtitleContainer}>
          <TextWithPressableWords text={currentSubtitle} setIsModalVisible={setIsModalVisible} setSelectedWord={setSelectedWord}/>
        </View>
      }
      
    </View>
  )
};

export default VideoContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.pink,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  back: {
    position: "absolute",
    top: 50,
    left: 30,
    zIndex: 1,
  },
  dictionaryContainer: {
    position: 'absolute', 
    top: 60, 
    left: 0, 
    padding: 20,
    width: '100%', 
    height: '20%', 
    zIndex: 2, 
    backgroundColor: globalStyles.colors.orange, 
  }, 
  videoPlayerContainer: {
    position: 'absolute', 
    top: 250, 
    left: 0, 
    width: '100%', 
    height: '40%', 
    backgroundColor: globalStyles.colors.yellow, 
  }, 
  subtitleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    height: '30%', 
  }
});
