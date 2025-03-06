import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { customFonts } from "../../../src/constants/fonts";
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Header from '../../components/Header';
import BackGround from '../../components/BackGround';

export default function SpeedGame() {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <View>
      <Header color="#FFFFFF" />
      <BackGround />

      <View>
        <View style={styles.speedTextContainer}>
          <MaskedView
            style={styles.maskedView}
            maskElement={
              <View>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  speedTextContainer: {
    marginTop: 10,
    marginLeft: 10,
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
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50,
  },
  image: {
    width: '30%',
    height: 170,
    resizeMode: "contain",
  },
  infoText: {
    marginLeft: 20,
  },
  importantView: {
    backgroundColor: '#FFFFFF',
    width: '70%',
    height: 'fit-content',
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 50,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 5 },
  },
  importantTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  importantText: {
    fontSize: 15,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  importantText2: {
    fontSize: 15,
    width: '90%',
    alignSelf: 'center',
    marginLeft: 50,
  },
  practiceButton: {
    width: '60%',
    marginTop: 50,
    alignSelf: 'center',
    backgroundColor: "#FFE694",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  practiceButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});
