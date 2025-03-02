import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { customFonts } from "../../../src/constants/fonts";
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Header from '../../components/Header';
import SpeedBack from '../../components/SpeedBack';
import tailwind from 'tailwind-rn';

export default function SpeedInfo() {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <View>
      <SpeedBack heightMultiplier={1.87} />
      <Header color="#FFFFFF" />

      <View style={styles.container}>
        <View style={styles.speedTextContainer}>
          <MaskedView
            style={styles.maskedView}
            maskElement={
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.speedText}>스피드 게임</Text>
              </View>
            }
          >
            <LinearGradient
              colors={['#F26851', '#FFC0B6']}
              start={{ x: 0, y: 0.8 }} 
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            />
          </MaskedView>
        </View>

        <View style={[tailwind('flex-row justify-around'), { marginTop: 40, width: '100%' }]}>
          <Image
            source={require("../../../assets/images/sonsuModel.png")}
            style={[styles.image, { width: '60%' }]} 
          />
          <View style={[tailwind('justify-center flex-start'), { width: 'fit-content' }]}>
            <Text style={{ fontSize: 16 }}>
              스피드 퀴즈를 위해
            </Text>
            <Text style={{ fontSize: 16 }}>
              카메라를 준비해 주세요 📷
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  speedTextContainer: {
    marginTop: 10,
  },
  maskedView: {
    height: 40,
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  speedText: {
    fontSize: 40,
    fontFamily: 'RixInooAriDuriRegular',
    color: 'white',
    marginLeft: 30,
  },
  image: {
    height: 170,
    resizeMode: "contain",
  },
});
