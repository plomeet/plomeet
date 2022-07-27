import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useWindowDimensions, Text, View, StyleSheet } from "react-native";
import { Calendar } from 'react-native-calendars';

const LogCalendar = ({ dateArr, setListMonth, setShowSpinner }) => {
    const [markedDates, setMarkedDates] = useState(null);
    //const [dates, setDates] = useState(['2022-05-01', '2022-05-10']); // 테스트용 데이터

    //기록이 있는 날짜 마커 띄우기
    useEffect(() => {
        let markObj = dateArr.reduce(
            (c, v, i) =>
                Object.assign(c, {
                    [v]: { marked: true, dotColor: '#1BE58D', startingDay: true, color: '#1BE58D', endingDay: true, textColor: 'white' },
                })
            ,
            {}
        );
        setMarkedDates(markObj);
    }, [dateArr]);

    // useEffect(() => {
    //     const now = new Date();
    //     const dateString = dateFormat(now);
    //     setListMonth(dateString);
    // }, []);

    const makeDs = (dateStr) => {
        showSpinner();
        const dateFormatStr = dateStr.substring(0, 7);
        setListMonth(dateFormatStr);
    }
    const showSpinner = () => {
        setShowSpinner(true);
    }
    // const dateFormat = (date) => {  //dateformat 마찬가지
    //     let month = date.getMonth() + 1;

    //     month = month >= 10 ? month : '0' + month;

    //     return date.getFullYear() + '-' + month;
    // }

    return (
        <View style={styles.container}>
          <View style={[{backgroundColor:"#fff"}, {width: "100%"}, {paddingHorizontal:10}, {paddingBottom:15}]}>
            <Calendar
                markingType={'period'}
                markedDates={markedDates}
                //onDayPress={day => { setSelectDate(day); }}
                minDate={"1996-05-10"}
                maxDate={"2030-05-30"}
                scrollEnabled={true}
                onMonthChange={month => (makeDs(month.dateString))}
            />
          </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        marginTop: 5,
    },
})

export default LogCalendar;
