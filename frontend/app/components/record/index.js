import React, { Component, Node, Button, useEffect } from 'react';
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
                <ScrollView>
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
        flex: 1,
        paddingBottom: 5
    },

});

export default Record;