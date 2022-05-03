import React from 'react';
import { useWindowDimensions, Text, View, StyleSheet } from "react-native";
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from "styled-components/native";
import StartBtn from '../icons/startBtn.svg';
import EndBtn from '../icons/endBtn.svg';
import RequestCameraBtn from '../icons/requestCameraBtn.svg';

const PloggingStartEndButton = ({ isPlogging, handleIsPlogging }) => {
    console.log({ isPlogging });
    if (!isPlogging) { //시작중이 아니면 시작으로 처리
        return (
            <View style={styles.startBtn}>
                <TouchableOpacity style={styles.elevation} onPress={() => handleIsPlogging(true)}>
                    <StartBtn />
                </TouchableOpacity>
            </View>
        )
    }
    else { //플로깅 종료하기
        return (
            <View style={styles.endState} >
                <View style={styles.endBtn}>
                    <TouchableOpacity style={styles.elevation} onPress={() => handleIsPlogging(false)}>
                        <EndBtn />
                    </TouchableOpacity>
                </View>
                <View style={styles.cameraBtn}>
                    <TouchableOpacity style={styles.elevation}>
                        <RequestCameraBtn />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    startBtn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '12%'
    },
    endState: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '12%',
    },
    endBtn: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    cameraBtn: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 8
    },
    elevation: {
        width: "100%",
        height: "100%",
        borderRadius: 26,
        elevation: 5
    }
})

export default PloggingStartEndButton;