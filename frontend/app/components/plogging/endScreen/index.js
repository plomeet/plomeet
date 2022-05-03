import React, { useEffect, useRef, useState, useCallback } from 'react';
import 'react-native-gesture-handler';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "../map/index";
import { Image, ImageBackground, PermissionsAndroid, Platform, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import PloggingStatusBar from '../plogging-status-bar/index';
import { useSelector } from "react-redux"

const EndPlogging = ({ ploggingPath, center }) => {
    const mapView = useRef(null);
    const [middle, setMiddle] = useState();
    const distSum = useSelector(state => state.distSum);
    const isPlogging = useSelector(state => state.isPlogging);

    useEffect(() => {

        if (ploggingPath[(ploggingPath.length / 2)] === undefined || ploggingPath.length < 2) {
            const { latitude, longitude } = center;
            setMiddle({
                ...middle,
                latitude,
                longitude,
            });
        } else {
            const { latitude, longitude } = ploggingPath[(ploggingPath.length / 2)];
            setMiddle({
                ...middle,
                latitude,
                longitude,
            });
        }

    }, []);
    return (<>
        {middle &&
            <View
                style={style.container}
            >
                <View style={style.containerTime} >
                    <Text>시간 영역</Text>
                </View>
                <View style={style.containerMap} >
                    <NaverMapView ref={mapView}
                        style={style.container}
                        center={{ ...middle, zoom: 16 }}
                        useTextureView>

                        {ploggingPath.length >= 2 &&
                            <Path coordinates={ploggingPath} onClick={() => console.log('onClick! path')} width={5} color={'blue'} />
                        }
                    </NaverMapView>
                </View>
                <View style={style.containerState} >
                    <PloggingStatusBar distSum={distSum} isPlogging={isPlogging}></PloggingStatusBar>
                </View>
                <View style={style.containerPicture} >
                    <Text>사진 영역</Text>
                </View>
                <View style={style.containerBtn} />
            </View>
        }</>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: "column",
        height: "100%",
        backgroundColor: "white",
        padding: 10
    },
    containerTime: {
        flex: 1, backgroundColor: "blue"
    },
    containerMap: {
        flex: 4, backgroundColor: "purple"
    },
    containerState: {
        marginTop: 5,
        flex: 1.2,
    },
    containerPicture: {
        flex: 3, backgroundColor: "yellow"
    },
    containerBtn: {
        flex: 4, backgroundColor: "white"
    },
})

export default EndPlogging;