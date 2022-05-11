import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useWindowDimensions, Text, View, StyleSheet } from "react-native";
import { Calendar } from 'react-native-calendars';

const LogCalendar = () => {
    const [markedDates, setMarkedDates] = useState(null);
    const [dates, setDates] = useState(['2022-05-01', '2022-05-10']); // 테스트용 데이터
    const [selectDate, setSelectDate] = useState();

    //기록이 있는 날짜 마커 띄우기
    useEffect(() => {
        let markObj = dates.reduce(
            (c, v, i) =>
                Object.assign(c, {
                    [v]: { marked: true, dotColor: 'white', startingDay: true, color: '#1BE58D', endingDay: true },
                })
            ,
            {}
        );

        // if (selectDate)
        //     markObj = Object.assign(markObj, { [selectDate.dateString]: { marked: true, dotColor: 'white', startingDay: true, color: '#1BE58D', endingDay: true } });
        // console.log(markObj);
        setMarkedDates(markObj);
    }, [selectDate]);

    // const selectMarking = (day) => {

    //     console.log(day.dateString);

    //     Object.assign(markObj, { [day.dateString]: { marked: true, dotColor: 'white', startingDay: true, color: '#1BE58D', endingDay: true } });
    //     console.log(markObj);
    //     setMarkedDates(markObj);
    //     const selectDateMarker = day.dateString : { marked: true, dotColor: 'white', startingDay: true, color: '#1BE58D', endingDay: true };
    // }

    return (
        <View style={styles.container}>
            <Calendar
                style={styles.calendar}
                markingType={'period'}
                markedDates={markedDates}
                //onDayPress={day => { setSelectDate(day); }}
                minDate={"1996-05-10"}
                maxDate={"2030-05-30"}
                scrollEnabled={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        marginTop: 5,
        flex: 5,
    },
    calendar: {
        height: "100%",
    },
})

export default LogCalendar;
