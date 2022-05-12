import React from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from "react-native";
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StartBtn from '../icons/startBtn.svg';
import EndBtn from '../icons/endBtn.svg';
import SaveBtn from '../icons/saveBtn.svg';
import RequestCameraBtn from '../icons/requestCameraBtn.svg';
import { useCameraDevices, Camera, LoadingView } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const PloggingStartEndButton = ({ isPlogging, handleIsPlogging, showPloggingEndPage, handleShowEndPage, setStart, setIsSave }) => {
    const navigation = useNavigation();
    const devices = useCameraDevices();
    const device = devices.back;
    const WEEKDAY = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];


    const openCamera = async () => {
        if (Platform.OS === 'ios') {
            const permission = await Camera.requestCameraPermission();
            if (permission === "authorized") {
                console.log(permission)
                navigation.navigate('CameraPage', { device: device })
            }
            else { } // todo: 권한 거부시 추가 처리
        }
        else if (Platform.OS === 'android') {
            //확인 필요
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: '카메라 권한',
                        message: '플로깅 중 카메라 활용에 동의합니다.',
                        buttonNeutral: '나중에',
                        buttonNegative: '거부',
                        buttonPositive: '승인',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');
                    return true;
                } else {
                    console.log('Camera permission denied');
                    return false;
                }
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
    }

    const onStart = () => {
        handleIsPlogging(true);
        const curr = new Date();
        const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
        const kr_curr = new Date(utc + (KR_TIME_DIFF));
        const year = kr_curr.getFullYear();
        const month = ('0' + (kr_curr.getMonth() + 1)).slice(-2);
        const day = ('0' + kr_curr.getDate()).slice(-2);
        const dateString = year + '/' + month + '/' + day;

        const hours = ('0' + kr_curr.getHours()).slice(-2);
        const minutes = ('0' + kr_curr.getMinutes()).slice(-2);
        const timeString = hours + ':' + minutes;

        const week = WEEKDAY[kr_curr.getDay()];
        setStart([dateString, week, timeString, kr_curr]);
    }


    const saveButtonClick = async () => {
        goSave();
    }

    const goSave = () => {
        setIsSave(true);
    }


    if (!isPlogging && !showPloggingEndPage) { //시작중이 아니면 시작으로 처리
        return (
            <View style={styles.startBtn}>
                <TouchableOpacity style={styles.elevation} onPress={() => onStart()}>
                    <StartBtn />
                </TouchableOpacity>
            </View>
        )
    }
    else if (isPlogging && !showPloggingEndPage) { //플로깅 종료하기
        return (
            <View style={styles.endState} >
                <View style={styles.endBtn}>
                    <TouchableOpacity style={styles.elevation} onPress={() => {
                        handleIsPlogging(false); handleShowEndPage(true);
                    }}>
                        <EndBtn />
                    </TouchableOpacity>
                </View>
                <View style={styles.cameraBtn}>
                    <TouchableOpacity style={styles.elevation} onPress={() => openCamera()}>
                        <RequestCameraBtn />
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else { //종료하고 기록 화면 보여줄때
        return (
            <View style={styles.saveBtn} >
                <TouchableOpacity style={styles.elevation} onPress={() => { saveButtonClick() }}>
                    <SaveBtn />
                </TouchableOpacity>
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
        bottom: 150
    },
    endState: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 150,
    },
    endBtn: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 7
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
    },
    saveBtn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40
    },
})

export default PloggingStartEndButton;