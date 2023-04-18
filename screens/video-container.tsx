import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { globalStyles } from "../styles/global-styles.config";
import * as ScreenOrientation from "expo-screen-orientation";
import VideoPlayer from "./video-player";
import TextWithPressableWords from "./pressableWords";
import DictionaryModal from "./dictionaryModal";


const VideoContainer = ({ route }) => {
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
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
      {/* Definition Modal */}
      {isModalVisible &&
      <View style={styles.dictionaryContainer}> 
        <DictionaryModal word={selectedWord}/> 
      </View> 
      }

      <VideoPlayer route={route} calculateCurrentSubtitle={calculateCurrentSubtitle}/>
     
      {/* Current clickable subtitle */}
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
    backgroundColor: globalStyles.colors.black,
    // width: "100%",
    // height: "100%",
    justifyContent: "center",
  },
  dictionaryContainer: {
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
    padding: 20,
    height: '20%', 

  }, 
  text: {
    backgroundColor: globalStyles.colors.black,
    color: globalStyles.colors.orange,
    height: '50%', 
  }, 
  video: {
    width: "100%",
    height: "90%",
  },
  // back: {
  //   position: "absolute",
  //   top: 30,
  //   left: 30,
  //   zIndex: 1,
  // },
  subtitleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    height: '30%', 
  },
  subtitleText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
});
