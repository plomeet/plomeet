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
import { useSelector } from 'react-redux';
import AWS from 'aws-sdk';
import Config from 'react-native-config'


const PloggingStartEndButton = ({ isPlogging, handleIsPlogging, showPloggingEndPage, handleShowEndPage, setStart }) => {
    const navigation = useNavigation();
    const devices = useCameraDevices();
    const device = devices.back;
    const WEEKDAY = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    const images = useSelector(state => state.images)

    // const nowDate = moment().format('YYYY/MM/DD');
    // const nowDay = moment().day();
    // const nowTime = moment().format('HH:mm');

    var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
    });
    
    AWS.config.update({
        region: 'ap-northeast-2', // 리전이 서울이면 이거랑 같게
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: Config.IDENTITYPOOLID,
        })
    })

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
    

    const saveButtonClick = async() => {
        await upload();
        await handleShowEndPage(false);
    }

    const upload = async () => {

        const promises = images.map(async (img) => {
            const response1 = await fetch(img.uri)
            const blob = await response1.blob()
            // var albumPhotosKey = encodeURIComponent(albumName) + '//';
            // var photoKey = albumPhotosKey + fileName;
            var photoKey = "photos/" + img.id + "_" + img.fileName;

            var params = { Bucket: 'plomeet-image', Key: photoKey, Body: blob }
            await s3.upload(params, function (err, data) {
                if (err) {
                    alert('There was an error uploading your photo: ', err.message);
                }
                // data.Location
                // https://plomeet-image.s3.ap-northeast-2.amazonaws.com/photos/1_3C369038-4102-4887-A8DB-43C42E706340.jpg
                // data.Key
                // photos/1_3C369038-4102-4887-A8DB-43C42E706340.jpg
                console.log(data)
            });
        });

        await Promise.all(promises)
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