import React, { useState, useEffect, useRef, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Config from 'react-native-config'
import DetailArrow from '../icon/detailArrow.svg';

const PloggingList = (key) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            key={key}
            onPress={
                () => navigation.navigate('logDetail', { msg: "show logDetail" })
            }>
            <View style={styles.container}>
                <View style={styles.dateContainer}>
                    <Text style={styles.weekText}>THU</Text>
                    <Text style={styles.dateText}>13</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.countInfo}>5월 5번째 플로깅</Text>
                    <Text style={styles.timeInfo}>00.0km / 00:00</Text>
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
    },
    infoContainer: {
        paddingLeft: 16,
        flex: 8,
    },
    detailButtonContainer: {
        flex: 1,
        paddingTop: 6,
    },
    weekText: {
        color: "#12D3DD",
    },
    dateText: {
        color: "#12D3DD",
        fontSize: 23,
    },
    countInfo: {
        color: "#000000",
        fontSize: 20,
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
