import React, { useState, useEffect, useRef, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Config from 'react-native-config'
import DetailArrow from '../icon/detailArrow.svg';

const PloggingList = ({ id, log, mm, index }) => {
    const navigation = useNavigation();
    const week = { 일: 'SUN', 월: 'MON', 화: 'TUE', 수: 'WED', 목: 'THU', 금: 'FRI', 토: 'SAT' };
    const P0 = { latitude: 37.564362, longitude: 126.977011 };
    const [weekParse, setWeekParse] = useState();
    const [dateParse, setDateParse] = useState();

    useEffect(() => {//"plogDate": "2022/05/12(목)-17:56",
        const date = log.plogDate.substring(8, 12);
        const dateArr = date.split('(');
        setWeekParse(week[dateArr[1]]);
        setDateParse(dateArr[0]);
    }, []);
    return (
        <TouchableOpacity
            key={id}
            onPress={
                () => navigation.navigate('logDetail', { msg: "show logDetail", userId: log.userId, plogId: id, log: log, mm: mm, index: index }) //추후 수정
            }>
            <View style={styles.container}>
                <View style={styles.dateContainer}>
                    <Text style={styles.weekText}>{weekParse}</Text>
                    <Text style={styles.dateText}>{dateParse}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.countInfo}>{mm}월 {index + 1}번째 플로깅</Text>
                    <Text style={styles.timeInfo}>{log.plogDist}km / {log.plogTime}</Text>
                </View>
                <View style={styles.detailButtonContainer}>
                    <DetailArrow></DetailArrow>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 63,
        marginLeft: 22,
        marginRight: 22,
        borderRadius: 15,
        marginTop: 9,
        backgroundColor: "#FFFFFF",
        padding: 8,
    },
    dateContainer: {
        flex: 2,
        borderRightWidth: 1,
        borderColor: "#C4C4C4",
        alignItems: "center",
        justifyContent: "center",
    },
    infoContainer: {
        paddingLeft: 16,
        flex: 8,
        justifyContent: "center",
    },
    detailButtonContainer: {
        flex: 1,
        justifyContent: "center",
    },
    weekText: {
        color: "#12D3DD",
    },
    dateText: {
        color: "#12D3DD",
        fontSize: 20,
    },
    countInfo: {
        color: "#000000",
        fontSize: 15,
    },
    timeInfo: {
        color: "#7A7A7A",
        fontSize: 12,
    },
    buttonIcon: {
        width: 80,
        height: 120,
    }
})

export default PloggingList;
