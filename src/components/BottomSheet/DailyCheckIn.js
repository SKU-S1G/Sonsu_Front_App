import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import ShortcutButton from "../ShortcutButton";

const DailyCheckIn = () => {
  const [selectedDates, setSelectedDates] = useState({}); // 출석 체크된 날짜

  // 요일 배열 (일요일 ~ 토요일)
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  // 현재 주의 날짜 가져오기
  const getCurrentWeek = () => {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    ); // 일요일 시작

    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return {
        date: date.getDate(),
        day: weekDays[date.getDay()], // 요일 가져오기
        fullDate: date.toISOString().split("T")[0], // YYYY-MM-DD 형식
      };
    });
  };

  const [week, setWeek] = useState(getCurrentWeek);

  // 출석 체크 토글
  const toggleAttendance = (fullDate) => {
    setSelectedDates((prev) => ({
      ...prev,
      [fullDate]: !prev[fullDate], // true/false 토글
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>오늘의 출석</Text>
        <ShortcutButton
          style={styles.ShortcutButton}
          destination="AttendanceCheck"
        />
      </View>
      <View style={styles.CalendarContainer}>
        {week.map(({ date, day, fullDate }, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day}</Text>
            <TouchableOpacity
              style={[styles.day, selectedDates[fullDate] && styles.attended]}
              onPress={() => toggleAttendance(fullDate)}
            >
              {selectedDates[fullDate] ? (
                <Image
                  style={styles.image}
                  source={require("../../../assets/images/SonsuLogo.png")}
                />
              ) : (
                <Text style={styles.dateText}>{date}</Text>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  titleWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  CalendarContainer: {
    flexDirection: "row",
    height: 100,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 5,

    // ✅ iOS 그림자 효과
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // ✅ Android 그림자 효과
    elevation: 4,
  },

  dayContainer: {
    alignItems: "center",
  },

  dayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },

  day: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  attended: {
    backgroundColor: "#FFEB99",
  },

  image: {
    resizeMode: "contain",
    width: 30,
    height: 30,
  },

  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});

export default DailyCheckIn;
