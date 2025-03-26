import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Header from "../../components/Header";
import BackGround from "../../components/BackGround";
import Notice from "../../components/Notice";
import Menu from "../../components/Menu";
import { ScrollView } from "react-native-gesture-handler";
import Pie from "../../components/Pie";

const AttendanceCheck = () => {
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({}); // 월별 선택된 날짜 상태 추가

  // 현재 날짜에 맞는 달력 데이터 생성
  useEffect(() => {
    const now = currentDate;
    const year = now.getFullYear();
    const month = now.getMonth(); // 0 ~ 11, 0은 1월
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const days = [];
    const startDay = firstDayOfMonth.getDay(); // 월 첫째 날의 요일 (0: 일요일, 6: 토요일)
    const lastDate = lastDayOfMonth.getDate(); // 해당 월의 마지막 날짜

    // 이전 달의 날짜 추가 (해당 월의 첫날이 시작하는 요일에 맞춰서)
    const prevMonth = new Date(year, month, 0);
    const prevMonthLastDate = prevMonth.getDate();
    const prevMonthDays = [];
    for (let i = startDay; i > 0; i--) {
      prevMonthDays.push({
        date: prevMonthLastDate - i + 1,
        isCurrentMonth: false,
      });
    }

    // 현재 월의 날짜들 추가
    const currentMonthDays = [];
    for (let i = 1; i <= lastDate; i++) {
      currentMonthDays.push({ date: i, isCurrentMonth: true });
    }

    const totalDays = prevMonthDays.length + currentMonthDays.length;
    const remainingDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7); // 한 줄 더 추가되는 문제 방지

    const nextMonthDays = [];
    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push({
        date: i,
        isCurrentMonth: false,
      });
    }

    // 전체 날짜 배열 합치기
    setDaysInMonth([...prevMonthDays, ...currentMonthDays, ...nextMonthDays]);
  }, [currentDate]);

  // 오늘 날짜와 비교하여 강조하는 함수
  const isToday = (day) => {
    const today = new Date();
    return (
      today.getDate() === day.date &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear() &&
      day.isCurrentMonth
    );
  };

  // 날짜 선택 시 상태 업데이트 (월별로 선택된 날짜 추가/삭제)
  const onDateSelect = (day) => {
    if (day.isCurrentMonth) {
      const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
      setSelectedDates((prevState) => {
        const selectedForMonth = prevState[monthKey] || [];
        const updatedSelectedDates = selectedForMonth.includes(day.date)
          ? selectedForMonth.filter((date) => date !== day.date) // 이미 선택된 날짜는 취소
          : [...selectedForMonth, day.date]; // 새 날짜 선택
        return {
          ...prevState,
          [monthKey]: updatedSelectedDates,
        };
      });
    }
  };

  // 요일 표시
  const renderWeekdays = () => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    return (
      <View style={styles.weekdaysContainer}>
        {weekdays.map((weekday, index) => (
          <Text key={index} style={styles.weekday}>
            {weekday}
          </Text>
        ))}
      </View>
    );
  };

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    setCurrentDate(new Date(newDate));
  };

  // 이후 달로 이동
  const goToNextMonth = () => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setCurrentDate(new Date(newDate));
  };

  const renderItem = ({ item }) => {
    if (!item.date) return null; // item.date가 없다면 렌더링하지 않음

    const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
    const isSelected =
      selectedDates[monthKey] && selectedDates[monthKey].includes(item.date);

    return (
      <View
        key={`${item.date}-${item.isCurrentMonth}`} // date와 isCurrentMonth를 결합한 고유한 key 사용
        style={[
          styles.day,
          !item.isCurrentMonth && styles.disabledDay, // 현재 월이 아닌 날짜는 비활성화

          isSelected && styles.selectedDay && item.isCurrentMonth, // 선택된 날짜 강조
        ]}
      >
        <TouchableOpacity onPress={() => onDateSelect(item)}>
          <Text
            style={[
              styles.dayText,
              !item.isCurrentMonth && styles.disabledDayText, // 현재 월이 아닌 날짜 스타일
              isToday(item) && styles.todayText, // 오늘 날짜일 때 텍스트 색상 변경
            ]}
          >
            {item.date}
          </Text>
        </TouchableOpacity>

        {isSelected && item.isCurrentMonth && (
          <Image
            source={require("../../../assets/images/SonsuLogo.png")}
            style={styles.selectedImage}
          />
        )}
      </View>
    );
  };

  // PieChart
  const firstValue = 20;
  const secondValue = 100 - firstValue;
  const data = [
    { value: firstValue, color: "#e0e0e0" },
    { value: secondValue, color: "#FFE694" },
  ];
  const radius = 50;
  const innerRadius = 25;
  const backgroundColor = "#f5f5f5";

  // 공지 글
  const NotText = "출석은 하루에 최소 1개 이상의 학습을 완료해야만 인정됩니다.";

  return (
    <View>
      <Header />
      <BackGround />

      <View>
        <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 5 }}>
          출석체크
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "center",
            color: "#333",
            marginBottom: "10%",
          }}
        >
          내 수어 학습 출석률은? 오늘도 한 걸음 더 나아가요!
        </Text>
      </View>
      {/* 달력 */}
      <ScrollView>
        <View style={styles.calenderContainer}>
          <View style={styles.monthHeader}>
            <TouchableOpacity onPress={goToPreviousMonth}>
              <Text style={styles.arrow}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={styles.header}>
              {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </Text>
            <TouchableOpacity onPress={goToNextMonth}>
              <Text style={styles.arrow}>{">"}</Text>
            </TouchableOpacity>
          </View>
          {renderWeekdays()}
          <View style={styles.calendarContent}>
            {daysInMonth.map((item, index) => renderItem({ item }))}
          </View>
        </View>

        {/* 공지 */}
        <Notice NotText={NotText} />

        {/* 나의 00월 출석률은? */}
        <View style={{ width: "90%", alignSelf: "center", marginTop: 45 }}>
          <Text style={styles.title}>
            나의 {currentDate.getMonth() + 1}월 출석률은?
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              alignSelf: "center",
            }}
          >
            <View style={styles.PieWrap}>
              <Pie
                data={data}
                radius={radius}
                innerRadius={innerRadius}
                backgroundColor={backgroundColor}
                donut={true}
              />
            </View>
            <View style={{ marginLeft: 20, justifyContent: "center" }}>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                {firstValue}%
              </Text>
              <Text style={{ fontSize: 12, marginTop: 8 }}>
                100%를 향한 도전, 함께 달려보아요!
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  calenderContainer: {
    alignSelf: "center",
    padding: 20,
    backgroundColor: "white",
    width: "90%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  arrow: {
    fontSize: 20,
    color: "#333",
  },
  weekdaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  weekday: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  day: {
    width: "12.34%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // 이미지가 날짜 위에 나타나도록 설정
    margin: 3,
  },
  dayText: {
    fontSize: 16,
  },
  todayText: {
    color: "orange",
    fontWeight: "bold",
  },
  disabledDayText: {
    color: "#d3d3d3",
  },
  selectedDay: {},
  selectedImage: {
    backgroundColor: "#FFE694", // 선택된 날짜 스타일
    position: "absolute",
    borderRadius: 30,
    width: 35,
    height: 35,
    padding: 3,
    resizeMode: "contain",
  },
  calendarContent: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    paddingLeft: 10,
  },
  PieWrap: {
    // backgroundColor: "red",
  },
});

export default AttendanceCheck;
