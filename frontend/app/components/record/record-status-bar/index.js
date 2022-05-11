import React, { useState, useEffect, useRef, useCallback } from "react";
import { useWindowDimensions, Text, View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import MapSvg from '../../plogging/icons/map.svg';
import TimeSvg from '../../plogging/icons/timer.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Config from 'react-native-config'

const RecordStatusBar = () => {
    const layout = useWindowDimensions();

    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.titleText}>지금까지 누구누구님은</Text>
            </View>
            <RecordStatusBarBlock width={layout.width}>
                <View style={styles.statusView}>
                    <MapSvg width={27} height={27} fill={"#FFF"} />
                    <Text style={styles.statusText}>총 km</Text>
                </View>
                <View style={styles.statusView}>
                    <TimeSvg width={27} height={27} fill={"#FFF"} />
                    <Text style={styles.statusText}>총 시간</Text>
                </View>
                <View style={styles.statusView}>
                    <Icon name="run" size={27} color="#292D32" />
                    <Text style={styles.statusText}>총 횟수</Text>
                </View>

            </RecordStatusBarBlock>
        </View>
    );
};

export default RecordStatusBar;


const styles = StyleSheet.create({
    statusView: {
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        marginLeft: 11,
        fontSize: 17,
    },
    containerTitle: {
        display: "flex",
        backgroundColor: "white",
        height: 25,
        alignItems: 'center',
        flexDirection: "row",
        marginTop: 5,
    },
    titleText: {
        fontSize: 18,
        marginLeft: 20,
        fontWeight: "bold",
        position: "absolute",
    },
    container: {
        flexDirection: "column",
        flex: 1.2,
        backgroundColor: "#FFFFFF",
    },
})

const RecordStatusBarBlock = styled.View`
      display: flex;
      flex-direction: row;
      flex: 1;
      width: ${props => props.width}px;
      background-color: #ffffff;
      padding: 0px 10px 5px 10px;
    `