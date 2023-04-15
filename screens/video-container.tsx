import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Video as ExpoVideo, ResizeMode } from "expo-av";
import { globalStyles } from "../styles/global-styles.config";
import * as ScreenOrientation from "expo-screen-orientation";
import { Ionicons, Entypo, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Loader from "../components/loader";
import { getMinutesSecondsFromMilliseconds } from "../utils/getMinutesSecondsFromMilliseconds";
import VideoPlayer from "./video-player";


const VideoContainer = ({ route }) => {
  // const [subtitles, setSubtitles] = useState([]);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  // const [currentTime, setCurrentTime] = useState(0);

  // const onProgress = (progressData) => {
  //   setCurrentTime(progressData.currentTime);

  //   if (subtitles && subtitles.length > 0) {
  //     const currentSubtitleIndex = subtitles.findIndex(
  //       (subtitle) =>
  //         currentTime >= subtitle.startTime && currentTime <= subtitle.endTime
  //     );

  //     if (currentSubtitleIndex >= 0) {
  //       setCurrentSubtitle(subtitles[currentSubtitleIndex].text);
  //     } else {
  //       setCurrentSubtitle('');
  //     }
  //   }
  // };

  React.useEffect(() => {
    console.log(`current subtitle: ${currentSubtitle}`)
  }, [currentSubtitle]);



  return (
    <View style={styles.container}> 
      <VideoPlayer route={route} setCurrentSubtitle={setCurrentSubtitle}/>
      {currentSubtitle ? (
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>{currentSubtitle}</Text>
        </View>
      ) : null}

      {/* <Text onPress={() => console.log(jsonsubs)} style={styles.text}> Text </Text> */}
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
  },
  subtitleText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
