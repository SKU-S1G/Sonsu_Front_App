import { View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window"); // 화면 너비 가져오기

const SpeedBack = ({ heightMultiplier }) => { // heightMultiplier를 props로 받음

  console.log("Rendering SpeedBack with heightMultiplier:", heightMultiplier);

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { height: width * heightMultiplier }]}></View> {/* height에 multiplier 적용 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: -1,
  },
  circle: {
    width: width,
    backgroundColor: "#FFE694",
    borderRadius: width / 2.3,
  },
});

export default SpeedBack;
