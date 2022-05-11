import React, { Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import RecordStatusBar from './record-status-bar/index'
import LogCalendar from './calendar/index'
import PloggingList from './ploggingList/index'

const Record = () => {
    const listCount = [1, 2, 3, 4, 5, 6, 7, 8];

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
                                <PloggingList />
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
        backgroundColor: "#DDDDDD",
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
        backgroundColor: "#DDDDDD",
    }
});

export default Record;