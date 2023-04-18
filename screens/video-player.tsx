import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Video as ExpoVideo, ResizeMode } from "expo-av";
import { globalStyles } from "../styles/global-styles.config";
import * as ScreenOrientation from "expo-screen-orientation";
import { Ionicons, Entypo, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Loader from "../components/loader";
import { getMinutesSecondsFromMilliseconds } from "../utils/getMinutesSecondsFromMilliseconds";


const VideoPlayer = ({ route, calculateCurrentSubtitle}) => {
  const { src } = route.params;
  const navigation = useNavigation();
  const [status, setStatus] = useState<any>();
  const [videoStatus, setVideoStatus] = useState<any>({});
  const [showControls, setShowControls] = useState<boolean>(
    status?.isPlaying
  );
  const video = useRef(null);
  const [videoSpeed, setVideoSpeed] = useState<number>(1.0);

  async function changeScreenOrientation(type: string) {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock[type]);
  }

  // Code to rotate video 
  // React.useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     changeScreenOrientation("LANDSCAPE_RIGHT");
  //   }, 1000);

  //   return () => clearTimeout(timeout);
  // }, []);

  useEffect(() => {
    status?.isPlaying && setShowControls(true);
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [status?.isPlaying]);

  useEffect(() => {
    const position = getMinutesSecondsFromMilliseconds(status?.positionMillis); 

    setVideoStatus({
      duration: getMinutesSecondsFromMilliseconds(status?.durationMillis),
      position, 
      width: `${
        (Number(status?.positionMillis) / Number(status?.durationMillis)) * 90
      }%`,
      
    });
    calculateCurrentSubtitle(status);
  }, [status]);

  const handleChangeSpeed = () => {
    if (videoSpeed === 1) {
      setVideoSpeed(0.9);
    } else if (videoSpeed === 0.9) {
      setVideoSpeed(0.8);
    } else if (videoSpeed === 0.8) {
      setVideoSpeed(0.7);
    } else if (videoSpeed === 0.7) {
      setVideoSpeed(1);
    }
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => setShowControls(!showControls)}
    >
      <ExpoVideo
        ref={video}
        usePoster
        rate={videoSpeed} 
        PosterComponent={() => (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </View>
        )}
        style={styles.video}
        // source={{
        //   uri: src,
        // }}
        source={require("../assets/videos/FriendsVideo.mp4")}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {showControls && (
        <>
          <TouchableOpacity
            onPress={() =>
              status?.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
            style={styles.videoTappableArea}
          >
            {status?.isPlaying ? (
              <Foundation name="pause" size={50} color="white" />
            ) : (
              <Entypo name="controller-play" size={50} color="white" />
            )}
          </TouchableOpacity>

          {/* Playback bar */}
          <TouchableOpacity onPress={handleChangeSpeed}>
              <View style={styles.changeSpeedContainer}>
                <Text style={styles.changeSpeedText}> {videoSpeed}x </Text>
              </View>
          </TouchableOpacity>

          <View style={styles.playbackArea}>
            <Text style={{ color: "white" }}>{videoStatus.position}</Text>
            <View style={styles.playbackBar}/>
            <View style={{
                height: 3,
                width: videoStatus.width,
                position: "absolute",
                left: "5%",
                backgroundColor: "white", 
              }}
            />
            <Text style={{ color: "white" }}>{videoStatus.duration}</Text>
          </View>
        </>
      )}
    </Pressable>
  );
};

export default VideoPlayer;

  {/* 'rgba(0, 0, 0, 0.5)' */}


const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.colors.orange,
    justifyContent: "center",
  },
  // For playing/pausing
  videoTappableArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  }, 
  playbackArea: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    position: "absolute",
    top: "80%",
    left: "5%",
    right: 0,
    bottom: 0,
    alignItems: "center",
  }, 
  playbackBar: {
    width: "90%",
    height: 3,
    backgroundColor: "white",
    opacity: 0.5,
  }, 
  changeSpeedContainer: {
    // backgroundColor: 'rgba(1, 1, 1, 0.5)',
    borderRadius: 20, 
    width: 50, 
    height: 50, 
    alignItems: 'center',
    justifyContent: 'center', 
  },
  changeSpeedText: {
    color: '#fff', 
    fontSize: 20, 
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
});
