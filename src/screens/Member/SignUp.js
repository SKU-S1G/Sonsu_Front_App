import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../../../confing";

const SignUp = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    id: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleSignUp = async () => {
    const newErrors = {};

    // 이름 유효성 검사
    if (!name) {
      newErrors.name = "이름을 입력하세요";
    } else if (name.length < 2) {
      newErrors.name = "이름은 최소 2글자 이상이어야 합니다";
    }

    // 아이디 유효성 검사
    if (!id) {
      newErrors.id = "아이디를 입력하세요";
    }

    // 비밀번호 유효성 검사
    if (!password) {
      newErrors.password = "비밀번호를 입력하세요";
    } else if (password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다";
    }

    // 비밀번호 확인 검사
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "이메일을 입력하세요";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "유효한 이메일을 입력하세요";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await axios.post(`${API_URL}/register`, {
          username: name,
          loginId: id,
          password: password,
          confirmPassword: confirmPassword,
          email: email,
        });
        console.log(response.data);
        navigation.navigate("Login");
      } catch (error) {
        console.log("회원가입 실패:", error.response.data.message);
      }
    }
  };

  const handleChangeName = (text) => {
    setName(text);
    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
  };

  const handleChangeId = (text) => {
    setId(text);
    if (errors.id) setErrors((prev) => ({ ...prev, id: "" }));
  };

  const handleChangePassword = (text) => {
    setPassword(text);
    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleChangeConfirmPassword = (text) => {
    setConfirmPassword(text);
    if (errors.confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
  };

  const handleChangeEmail = (text) => {
    setEmail(text);
    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require("../../../assets/images/SonsuLogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>손手잇다</Text>
      </View>

      <View style={styles.SignUpContainer}>
        <ScrollView contentContainerStyle={styles.SingUpInput}>
          <TextInput
            style={styles.input}
            placeholder="이름"
            value={name}
            onChangeText={handleChangeName}
            placeholderTextColor="#aaa"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <TextInput
            style={styles.input}
            placeholder="아이디"
            value={id}
            onChangeText={handleChangeId}
            placeholderTextColor="#aaa"
          />
          {errors.id && <Text style={styles.errorText}>{errors.id}</Text>}

          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            value={password}
            onChangeText={handleChangePassword}
            secureTextEntry
            placeholderTextColor="#aaa"
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChangeText={handleChangeConfirmPassword}
            secureTextEntry
            placeholderTextColor="#aaa"
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="이메일"
            value={email}
            onChangeText={handleChangeEmail}
            keyboardType="email-address"
            placeholderTextColor="#aaa"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </ScrollView>
        <TouchableOpacity style={styles.SignUpButton} onPress={handleSignUp}>
          <Text style={styles.SignUpButtonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFE694",
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
  SignUpContainer: {
    backgroundColor: "#fff",
    borderRadius: 50,
    flex: 1,
    paddingTop: "10%",
    paddingBottom: 20, // 아래쪽 여백 추가
  },
  SingUpInput: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 20, // 아래쪽 여백 추가
  },
  input: {
    width: "70%",
    height: 55,
    backgroundColor: "#F3F3F3",
    borderRadius: 30,
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  SignUpButton: {
    marginVertical: 20, // 상단 여백 추가
    width: "70%",
    height: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    alignSelf: "center",
  },
  SignUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontWeight: "200",
  },
});

export default SignUp;
