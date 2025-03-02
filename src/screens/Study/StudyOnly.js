import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SpeedBack from '../../components/SpeedBack';
import { WebView } from 'react-native-webview';

export default function StudyOnly() {
  const route = useRoute();
  const { topic, lesson } = route.params;
  const navigation = useNavigation();

  // const serverIP = "http://192.168.45.144:5001";
  // const serverIP = "http://192.168.10.20:5001";
  const serverIP = "http://192.0.0.2:5001";


  return (
    <SafeAreaView style={styles.container}>
      <SpeedBack heightMultiplier={1.88} />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <View style={styles.screenContainer}>
          <Text style={styles.title}>{`Step ${lesson.id}. ${topic}`}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.desContainer}>
        <Text style={styles.studyTitle}>혼자해보기</Text>
      </View>

      {/* 카메라 비디오 스트리밍 WebView */}
      <View style={styles.cameraFeedWrapper}>
        <WebView
          source={{ uri: `${serverIP}/video_feed` }}
          style={styles.cameraFeed}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={["*"]}
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          onError={(error) => console.log("WebView error:", error)}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.log("HTTP error: ", nativeEvent);
          }}
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={styles.text}>혼자서 학습해보세요!</Text>
        <Text style={styles.text}>안녕하세요</Text>
        <Text style={styles.text}>정확도 80%</Text>
      </View>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    width: "100%",
  },
  screenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  studyTitle: {
    fontSize: 23,
    fontWeight: "bold",
  },  
  title: {
    fontSize: 22,
    marginLeft: 10,
  },
  text: {
    fontSize: 15,
  },  
  desContainer: {
    marginTop: 30,
    width: 350,
  },
  backButton: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraFeedWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 20,
    aspectRatio: 9 / 16, 
  },
  cameraFeed: {
    flex: 1,
    backgroundColor: "transparent",
  },
});