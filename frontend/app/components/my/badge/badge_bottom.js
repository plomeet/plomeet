import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder
} from 'react-native';
import {
    BadgeDescComponent,
    BadgeDescImg,
    BadgeDescTitle,
    BadgeDescInfo
} from './styles'




const BadgeBottomSheet = (props) => {
    const { modalVisible, setModalVisible, badge } = props;
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                resetBottomSheet.start();
            }
        }
    })).current;

    useEffect(()=>{
        if(props.modalVisible) {
            resetBottomSheet.start();
        }
    }, [props.modalVisible]);

    const closeModal = () => {
        closeBottomSheet.start(()=>{
            setModalVisible(false);
        })
    }

    return (
        <Modal
            visible={modalVisible}
            animationType={"fade"}
            transparent
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    <View style={styles.background}/>
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{...styles.bottomSheetContainer, transform: [{ translateY: translateY }]}}
                    {...panResponders.panHandlers}
                >
                    { badge == undefined
                    ? null
                    :
                    <BadgeDescComponent>
                        <View>
                            <BadgeDescImg style={{ tintColor: 'gray' }} source={{uri: "https://plomeet-image.s3.ap-northeast-2.amazonaws.com/ploggingLog/1/55/rn_image_picker_lib_temp_780fa994-a969-4fc4-ab06-73528d252b26.jpg"}}></BadgeDescImg>
                            <BadgeDescImg style={{ position: 'absolute', opacity: 0.3 }} source={{uri: "https://plomeet-image.s3.ap-northeast-2.amazonaws.com/ploggingLog/1/55/rn_image_picker_lib_temp_780fa994-a969-4fc4-ab06-73528d252b26.jpg"}}></BadgeDescImg>
                        </View>
                        <BadgeDescTitle>{badge.badgeTitle}</BadgeDescTitle>
                        <BadgeDescInfo>획득방법:</BadgeDescInfo>
                        <BadgeDescInfo>{badge.badgeInfo}</BadgeDescInfo>
                    </BadgeDescComponent>
                    }
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    background: {
        flex: 1,
    },
    bottomSheetContainer: {
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    }
})

export default BadgeBottomSheet;