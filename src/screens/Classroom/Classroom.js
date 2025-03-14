import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import classData from "../../../utils/ClassData";
import StudyBack from "../../components/StudyBack";
import Feather from "@expo/vector-icons/Feather";

export default function Classroom() {
  const [selectedLevel, setSelectedLevel] = useState("초급");

  const [progress, setProgress] = useState({
    초급: { lessonId: 3, lastCompletedTopic: "감사합니다" },
    중급: { lessonId: 0, lastCompletedTopic: null },
    고급: { lessonId: 0, lastCompletedTopic: null },
  });

  const navigation = useNavigation();

  const levelColors = {
    초급: "#39B360",
    중급: "#487BCD",
    고급: "#FF9381",
  };

  const renderCategoryButtons = () => (
    <View style={styles.categoryContainer}>
      {["초급", "중급", "고급"].map((level) => (
        <TouchableOpacity
          key={level}
          style={[
            styles.categoryButton,
            selectedLevel === level && styles.selectedCategory,
          ]}
          onPress={() => setSelectedLevel(level)}
        >
          <View style={styles.textWrapper}>
            <Text
              style={[
                styles.categoryText,
                selectedLevel === level && styles.selectedCategoryText,
              ]}
            >
              {level}
            </Text>
            {selectedLevel === level && (
              <View
                style={[
                  styles.indicator,
                  { backgroundColor: levelColors[level] },
                ]}
              />
            )}
          </View>
        </TouchableOpacity>
      ))}

      {/* Review 버튼 추가 */}
      <TouchableOpacity
        style={styles.reviewButton}
        onPress={() => navigation.navigate("Review")}
      >
        <Text style={styles.reviewButtonText}>Review</Text>
      </TouchableOpacity>
    </View>
  );

  const lessons = classData[selectedLevel] || [];
  const currentProgress = progress[selectedLevel];

  return (
    <SafeAreaView style={styles.container}>
      <StudyBack />
      <Text style={styles.Title}>배움터</Text>

      {renderCategoryButtons()}

      <View style={styles.titleTextWrapper}>
        <Text style={styles.titleText}>학습진도</Text>
        <Text style={[styles.titleText, { marginLeft: 12 }]}>
          <Text
            style={[
              styles.titleText,
              { color: levelColors[selectedLevel], fontWeight: "bold" },
            ]}
          >
            {currentProgress.lessonId}
          </Text>{" "}
          / {lessons.length} 강의
        </Text>
      </View>

      {/* 여기야여기 */}
      <View style={styles.NowContainer}>
        <TouchableOpacity
          // key={lesson.id}
          style={styles.contentContainer_}
          // disabled={lesson.id > currentProgress.lessonId}
        >
          <View style={styles.card_}>
            <View style={styles.imageContainer_}>
              <Image style={styles.image_} />
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text
              style={styles.title}
              numberOfLines={1} // 이 설정은 텍스트가 한 줄로 표시되도록 합니다.
              ellipsizeMode="tail" // 텍스트가 길어지면 끝부분을 잘라서 '...'로 표시합니다.
            >
              Part
            </Text>
            <Text style={styles.sub}>자음, 모음, 숫자, 단위</Text>
          </View>
          <Feather
            name="check-circle"
            size={27}
            color="black"
            style={styles.check}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {lessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            style={styles.contentContainer}
            onPress={() =>
              navigation.navigate("LessonDetail", {
                lesson,
                title: lesson.title,
                progress: currentProgress,
                selectedLevel: selectedLevel, // 선택한 레벨도 함께 넘겨줍니다.
              })
            }
            disabled={lesson.id > currentProgress.lessonId}
          >
            <View style={styles.card}>
              {lesson.id > currentProgress.lessonId && (
                <View style={styles.lockOverlay}>
                  <MaterialCommunityIcons name="lock" size={30} color="#fff" />
                </View>
              )}
              <View style={styles.imageContainer}>
                <Image source={lesson.animationPath} style={styles.image} />
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text
                style={styles.title}
                numberOfLines={1} // 이 설정은 텍스트가 한 줄로 표시되도록 합니다.
                ellipsizeMode="tail" // 텍스트가 길어지면 끝부분을 잘라서 '...'로 표시합니다.
              >
                Part {lesson.id}. {lesson.title}
              </Text>
              <Text style={styles.sub}>자음, 모음, 숫자, 단위</Text>
            </View>
            <Feather
              name="check-circle"
              size={27}
              color={lesson.id > currentProgress.lessonId ? "gray" : "green"}
              style={styles.check}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFE694',
    marginBottom: 12,
  },
  Title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  categoryButton: {
    marginRight: 20,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#666",
  },
  selectedCategoryText: {
    color: "#333",
  },
  textWrapper: {
    alignItems: "center",
  },
  indicator: {
    marginTop: 5,
    width: 40,
    height: 5,
    borderRadius: 10,
  },
  reviewButton: {
    backgroundColor: "#FF9381",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20, // 카테고리 버튼 사이에 여백을 추가
  },
  reviewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    // flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 18,
  },
  contentContainer: {
    flexDirection: "row",
    width: "100%",
    padding: "5%",
    marginBottom: 15,
    borderRadius: 10,
  },
  NowContainer: {
    paddingHorizontal: 18,
  },
  contentContainer_: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    padding: "5%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "space-between",
  },
  card: {
    // width: 100,
    minHeight: "fit-content",
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  card_: {
    // width: 100,
    minHeight: "fit-content",
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  lockOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    zIndex: 1,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer_: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  image_: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  textContainer: {
    justifyContent: "center",
    // alignItems: "center",
    marginLeft: 20,
    // marginBottom: 15,
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    // textAlign: "center",
    flexShrink: 1, // 텍스트가 넘치면 잘리도록 합니다.
  },
  sub: {
    fontSize: 12,
    marginTop: 3,
  },
  check: {
    alignSelf: "center",
    marginRight: 15,
  },
  titleTextWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 16,
  },
});
