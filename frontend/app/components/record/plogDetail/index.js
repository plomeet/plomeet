import React, { useEffect, useRef, useState, Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "../../plogging/map/index";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import BackSvg from '../../plogging/icons/back.svg'
import { TouchableOpacity } from 'react-native-gesture-handler';
import PloggingStatusBar from '../../plogging/plogging-status-bar/index';

const LogDetail = () => {
    const navigation = useNavigation();
    const mapView = useRef(null);
    const [middle, setMiddle] = useState({ latitude: 37.564362, longitude: 126.977011 });

    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <BackSvg width={20} height={20} fill={"#FFF"} style={{ marginLeft: 5 }}></BackSvg>
                </TouchableOpacity>
                <Text style={styles.titleText}>X월 X번째 플로깅</Text>
            </View>
            <View style={styles.containerTime} >
                <View style={styles.innerContainerTime} >
                    <Text style={styles.date}>2022/05/11(수) </Text>
                    <Text style={styles.timeStart}>17:28 출발</Text>
                </View>
            </View>
            <View style={styles.containerMap} >
                <NaverMapView ref={mapView}
                    style={styles.containerMapIn}
                    center={{ ...middle, zoom: 16 }}
                    useTextureView>
                    {/* {ploggingPath.length >= 2 &&
                            <Path coordinates={ploggingPath} onClick={() => console.log('onClick! path')} width={5} color={'blue'} />
                        } */}
                </NaverMapView>
            </View>
            <View style={styles.statusBar} >
                <PloggingStatusBar distSum={1.2} isPlogging={false} timeSumString={"01:01"}></PloggingStatusBar>
            </View>
            <View style={styles.pictureContainer} >
                <Text>사진공간</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
    },
    containerTitle: {
        flex: 0.05,
        backgroundColor: "white",
        alignItems: 'center',
        flexDirection: "row",
        alignItems: 'flex-end',
    },
    titleText: {
        fontSize: 20,
        marginLeft: 40,
        fontWeight: "bold",
        position: "absolute",
    },
    containerTime: {
        flex: 0.05,
        backgroundColor: "white",
        flexDirection: 'column',
    },
    innerContainerTime: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 20,
        marginLeft: 15,
    },
    date: {
        fontSize: 15,
        color: 'black',
        fontWeight: "500"
    },
    timeStart: {
        fontSize: 12,
        color: "#ABABAB",
    },
    containerMap: {
        flex: 0.4,
        paddingLeft: 10,
        paddingRight: 10
    },
    containerMapIn: {
        flexDirection: "column",
        height: "100%",
        backgroundColor: "white",
    },
    statusBar: {
        flex: 0.1,
    },
    pictureContainer: {
        flex: 0.4,
    },
});

export default LogDetail;