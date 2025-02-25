import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Login = () => {
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post(

        "http://192.0.0.2:5002/login",

        {
          loginId: id,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          navigation.navigate("AppPermissions");
        }
      })
      .catch((error) => {
        console.error("로그인 실패:", error.response);
        alert("로그인 실패: 잘못된 아이디 또는 비밀번호입니다."); // 수정된 부분
      });
  };
  const handleSignUp = () => {
    navigation.navigate("PrivacyPolicy"); // 회원가입 버튼 클릭 시 SignUp.js로 이동
  };

  return (
    <View style={styles.container}>
      {/* 로고, 손手잇다 */}
      <View style={styles.topSection}>
        <Image
          source={require("../../../assets/images/SonsuLogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>손手잇다</Text>
      </View>

      <View style={styles.loginContainer}>
        <View style={styles.loginInput}>
          <TextInput
            style={styles.input}
            placeholder="아이디"
            placeholderTextColor="#aaa"
            value={id}
            onChangeText={setId}
          />

          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>아직 회원이 아니신가요?</Text>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.signupButtonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFE694",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topSection: {
    alignItems: "center",
    marginBottom: 50,
    paddingTop: 100,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  loginContainer: {
    backgroundColor: "#fff",
    width: "100%",
    height: "60%",
    borderRadius: 50,
    flex: 2,
    justifyContent: "flex-end",
  },
  loginInput: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  input: {
    width: "70%",
    height: 50,
    backgroundColor: "#F3F3F3",
    borderRadius: 30,
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  loginButton: {
    marginTop: 15,
    width: "70%",
    height: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    marginTop: 20,
    paddingVertical: 30,
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    width: "100%",
    flex: 0.8,
  },
  signupText: {
    color: "#666",
    fontSize: 14,
    marginTop: 20,
  },
  signupButton: {
    marginTop: 10,
    width: "70%",
    height: 50,
    backgroundColor: "#FFE694",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  signupButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Login;
