import React, { Component, Node, Button, useEffect } from 'react';
import 'react-native-gesture-handler';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import RecordStatusBar from './record-status-bar/index'
import LogCalendar from './calendar/index'
import PloggingList from './ploggingList/index'
//import axiosInstance from "../../../utils/API";
import axiosInstance from "../../../utils/ApiLocal";

const Record = () => {
    const listCount = [1, 2, 3, 4, 5, 6, 7, 8];
    const userId = 1; //나중에 리덕스 스토어에서 가져오기
    useEffect(() => {
        //let jArray = new Array();
        const getSavedLogs = async () => {
            try {
                await axiosInstance.get(`/ploggings/${userId}`)
                    .then((response) => {
                        if (response.status === 200) {
                            console.log(response.data.data[0].plogDist);

                        } else if (response.status === 204) {
                            console.log("저장된 기록이 없습니다") // todo 기록없을때 처리
                        }
                        else {
                            console.log("log insert FAIL " + response.status);
                        }
                    })
                    .catch((response) => { console.log(response); });
            } catch (err) { console.log(err); }
        };
        getSavedLogs();
    }, []);

    function getRouteJson(key, value) {
        if (key === 'route') return JSON.parse(value);
        return value;
    }

    return (
        <View style={styles.container}>
            <RecordStatusBar />
            <LogCalendar />

            <View style={styles.plogListContainer}>
                <Text style={styles.MonthListText}>이달의 플로깅 목록</Text>
                <ScrollView style={styles.ploggingLists}>
                    {
                        listCount.map(i => {
                            return (
                                <PloggingList key={i} />
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
    },
    plogListContainer: {
        flexDirection: "column",
        backgroundColor: "#EEEEEE",
        flex: 5,
    },
    MonthListText: {
        marginTop: 10,
        marginBottom: 2,
        fontSize: 18,
        marginLeft: 20,
        fontWeight: "bold",
        flex: 0.1,
    },
    ploggingLists: {
        flex: 0.5,
        flexDirection: "column",
        backgroundColor: "#EEEEEE",
    }
});

export default Record;