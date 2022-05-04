import React from 'react';
import { View, StyleSheet } from "react-native";
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StartBtn from '../icons/startBtn.svg';
import EndBtn from '../icons/endBtn.svg';
import SaveBtn from '../icons/saveBtn.svg';
import RequestCameraBtn from '../icons/requestCameraBtn.svg';
import { useCameraDevices, Camera, LoadingView } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';

const PloggingStartEndButton = ({ isPlogging, handleIsPlogging, showPloggingEndPage, handleShowEndPage }) => {
    const navigation = useNavigation();
    const devices = useCameraDevices()
    const device = devices.back

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

    if (!isPlogging && !showPloggingEndPage) { //시작중이 아니면 시작으로 처리
        return (
            <View style={styles.startBtn}>
                <TouchableOpacity style={styles.elevation} onPress={() => handleIsPlogging(true)}>
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
            <View style={styles.startBtn} >
                <TouchableOpacity style={styles.elevation} onPress={() => { handleShowEndPage(false); }}>
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
        bottom: '10%'
    },
    endState: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '10%',
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