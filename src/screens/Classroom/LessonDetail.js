import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/Header";
import Feather from "@expo/vector-icons/Feather";
import StudyBack from "../../components/StudyBack";

export default function LessonDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    lesson,
    title,
    progress,
    selectedLevel: initialSelectedLevel,
  } = route.params;

  const levelColors = {
    초급: "#39B360",
    중급: "#487BCD",
    고급: "#FF9381",
  };

  const [selectedLevel, setSelectedLevel] = useState(initialSelectedLevel); // 파람으로 받은 selectedLevel을 초기값으로 설정
  const currentProgress = progress[selectedLevel];

  // lesson.level이 있으면 selectedLevel을 해당 값으로 설정
  useEffect(() => {
    if (lesson.level && lesson.level !== selectedLevel) {
      setSelectedLevel(lesson.level);
    }
  }, [lesson.level, selectedLevel]); // lesson.level이 변경될 때마다 실행

  const isTopicLocked = (topic, index) => {
    if (lesson.id < progress.lessonId) {
      return false;
    } else if (lesson.id === progress.lessonId) {
      const lastCompletedTopicIndex = lesson.topics.findIndex(
        (t) => t === progress.lastCompletedTopic
      );
      return index > lastCompletedTopicIndex;
    }
    return true;
  };

  const renderCategoryButtons = () => (
    <View style={styles.categoryContainer}>
      {["초급", "중급", "고급"].map(
        (level) =>
          selectedLevel === level && (
            <TouchableOpacity
              key={level}
              style={[
                styles.categoryButton,
                selectedLevel === level && styles.selectedCategory, // 활성화된 카테고리 스타일
              ]}
              onPress={() => setSelectedLevel(level)}
            >
              <View style={styles.textWrapper}>
                <Text
                  style={[
                    styles.categoryText,
                    selectedLevel === level && styles.selectedCategoryText, // 활성화된 카테고리 텍스트 스타일
                  ]}
                >
                  {level}
                </Text>
              </View>
              {selectedLevel === level && (
                <View
                  style={[
                    styles.indicator,
                    { backgroundColor: levelColors[level] }, // 카테고리별 색상
                  ]}
                />
              )}
            </TouchableOpacity>
          )
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StudyBack />
      <Header color="#fff" />
      <View style={styles.backButton}>
        <Text style={styles.Title}>
          {"Part"} {lesson.id}. {lesson.title}
        </Text>
      </View>

      {renderCategoryButtons()}

      <View style={styles.titleTextWrapper}>
        <Text style={styles.titleText}>학습진도</Text>
        <Text style={[styles.titleText, { marginLeft: 12 }]}>
          <Text
            style={[styles.titleText, { color: "#39B360", fontWeight: "bold" }]}
          >
            {lesson.id <= progress.lessonId
              ? lesson.topics.filter((_, index) => !isTopicLocked(_, index))
                  .length
              : 0}
          </Text>{" "}
          / {lesson.topics.length} 강의
        </Text>
      </View>

      <View style={styles.NowContainer}>
        <TouchableOpacity
          style={[
            styles.contentContainer_,
            {
              backgroundColor:
                selectedLevel === "초급"
                  ? "#C7DACD"
                  : selectedLevel === "중급"
                  ? "#CBD3DF"
                  : selectedLevel === "고급"
                  ? "#E9D0CC"
                  : "#fff", // 기본값 (혹은 기본 색상을 원하면 변경)
            },
          ]}
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
        {lesson.topics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contentContainer}
            disabled={isTopicLocked(topic, index)}
            onPress={() => navigation.navigate("Study", { topic, lesson })}
          >
            <View style={styles.card}>
              {isTopicLocked(topic, index) && (
                <View style={styles.lockOverlay}>
                  <MaterialCommunityIcons name="lock" size={30} color="#fff" />
                </View>
              )}
              <View style={styles.imageContainer}>
                <Image source={lesson.animationPath} style={styles.image} />
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>
                Step {index + 1}. {topic}
              </Text>
            </View>
            <Feather
              name="check-circle"
              size={27}
              color={isTopicLocked(topic, index) ? "gray" : levelColors[selectedLevel]}
              style={styles.check}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE694",
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
  Title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  categoryButton: {
    marginRight: 20,
    paddingVertical: 8,
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
  scrollContainer: {
    flexGrow: 1,
    flexWrap: "wrap",
    padding: 18,
  },
  contentContainer: {
    flexDirection: "row",
    width: "100%",
    padding: "5%",
    marginBottom: 15,
    borderRadius: 10,
    justifyContent: "space-between",
    paddingBottom: 35,
    borderBottomColor: "#757575",
    borderBottomWidth: 0.3,
    borderRadius: 20,
  },
  card: {
    minHeight: "fit-content",
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
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
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginLeft: 10,
    // marginBottom: 15,
  },
  titleTextWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 16,
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
  image_: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  check: {
    alignSelf: "center",
    marginRight: 15,
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
});
