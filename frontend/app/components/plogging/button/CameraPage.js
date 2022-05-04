import { Camera } from 'react-native-vision-camera';
import React, { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { CAPTURE_BUTTON_SIZE, SAFE_AREA_PADDING } from './Constants'
import CameraRoll from '@react-native-community/cameraroll'
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Icon from 'react-native-vector-icons/Ionicons';
import { PressableOpacity } from 'react-native-pressable-opacity';
import { useNavigation } from '@react-navigation/native';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

function CameraPage({ route }) {
    const device = route.params.device;
    const camera = useRef();
    const navigation = useNavigation();

    console.log("device!!!!!" + device.id)

    const takePhoto = async () => {
        if (camera) {
            const photo = await camera.current.takePhoto({
                flash: 'off'
            })

            if (photo) {
                if (askPermission()) {
                    const result = await CameraRoll.save(photo.path);
                    if (result) {
                        showMessage({
                            message: "사진이 앨범에 저장되었습니다",
                            type: "info",
                        });
                    }

                }
            }
        }
    }

    const askPermission = async () => {
        if (Platform.OS === 'ios') {
            try {
                const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
                if (result === RESULTS.GRANTED) {
                    return true;
                }
            } catch (error) {
                console.log('askPermission', error);
            }
        } else if (Platform.OS === 'android') { //확인 필요
            try {
                const result = await request(PERMISSIONS.ANDROID.PHOTO_LIBRARY);
                if (result === RESULTS.GRANTED) {
                    return true;
                }
            } catch (error) {
                console.log('askPermission', error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.preview}
                device={device}
                ref={camera}
                photo={true}
                isActive={true}
            />
            <PressableOpacity style={styles.closeButton} onPress={navigation.goBack}>
                <Icon name="close" size={35} color="white" style={styles.icon} />
            </PressableOpacity>

            <View style={styles.captureButton}>
                <TouchableOpacity onPress={() => takePhoto()}>
                    <View style={styles.button}></View>
                </TouchableOpacity>
            </View>
            <FlashMessage position="top" />
        </View>

    )
}

export default CameraPage;

const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    preview: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    captureButton: {
        flex: 1,
        position: 'absolute',
        bottom: SAFE_AREA_PADDING.paddingBottom,
    },
    button: {
        width: CAPTURE_BUTTON_SIZE,
        height: CAPTURE_BUTTON_SIZE,
        borderRadius: CAPTURE_BUTTON_SIZE / 2,
        borderWidth: BORDER_WIDTH,
        borderColor: 'white',
    },
    closeButton: {
        position: 'absolute',
        top: SAFE_AREA_PADDING.paddingTop,
        left: SAFE_AREA_PADDING.paddingLeft,
        width: 40,
        height: 40,
    },
    icon: {
        textShadowColor: 'black',
        textShadowOffset: {
            height: 0,
            width: 0,
        },
        textShadowRadius: 1,
    },
})