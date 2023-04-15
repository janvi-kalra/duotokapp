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


const VideoContainer = ({ route }) => {
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const subtitles = require('../assets/subtitles/FriendsVideo.json')

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
      <VideoPlayer route={route} calculateCurrentSubtitle={calculateCurrentSubtitle}/>
      {currentSubtitle ? (
        <View style={styles.subtitleContainer}>
          <TextWithPressableWords text={currentSubtitle}/>
          {/* <Text style={styles.subtitleText}>{currentSubtitle}</Text> */}
        </View>
      ) : null}
    </View>
  )
};

export default VideoContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.white,
    width: "100%",
    height: "100%",
    justifyContent: "center",
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
  back: {
    position: "absolute",
    top: 30,
    left: 30,
    zIndex: 1,
  },
  subtitleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    // backgroundColor: globalStyles.colors.orange,
    padding: 10,
    height: '30%', 
  },
  subtitleText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
});
