import React, { useEffect, useRef, useState, Component, Node, Button } from 'react';
import 'react-native-gesture-handler';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "../../plogging/map/index";
import { ScrollView, StyleSheet, Text, View, Photo } from "react-native";
import { useNavigation } from '@react-navigation/native';
import PloggingStatusBar from '../../plogging/plogging-status-bar/index';
import DetailPhotos from './detailPhotos';

const LogDetail = ({ route }) => {
    const mapView = useRef(null);
    const [middle, setMiddle] = useState({ latitude: 37.564362, longitude: 126.977011 });
    const { userId, plogId, log, mm, index } = route.params;
    const [ploggingPathJson, setPloggingPathJson] = useState();
    //const { plogId } = route.params;

    useEffect(() => {
        setPloggingPathJson(JSON.parse(log.route).coord);
    }, []);

    useEffect(() => {
        if (ploggingPathJson !== undefined && ploggingPathJson[(ploggingPathJson.length / 2)] !== undefined && ploggingPathJson.length >= 2) {
            const { latitude, longitude } = ploggingPathJson[(ploggingPathJson.length / 2)];
            setMiddle({
                ...middle,
                latitude,
                longitude,
            });
        }
    }, [ploggingPathJson])



    const headerComponent = (
        <View>
            <View style={styles.containerTitle}>
                <Text style={styles.titleText}>{mm}월 {index + 1}번째 플로깅</Text>
                <View style={styles.innerContainerTime} >
                    <Text style={styles.date}>{log.plogDate.substring(0, 13)} </Text>
                    <Text style={styles.timeStart}>{log.plogDate.substring(14, 19)} 출발</Text>
                </View>
            </View>
            <View style={styles.containerMap} >
                <NaverMapView ref={mapView}
                    style={styles.containerMapIn}
                    center={{ ...middle, zoom: 16 }}
                    useTextureView>
                    {ploggingPathJson !== undefined && ploggingPathJson.length >= 2 &&
                        <Path coordinates={ploggingPathJson} onClick={() => console.log('onClick! path')} width={5} color={'blue'} />
                    }
                </NaverMapView>
            </View>
            <View style={styles.containerState} >
                <PloggingStatusBar distSum={log.plogDist} isPlogging={false} timeSumString={log.plogTime} islogDetail={true} logDetailWeather={log.plogWeather}></PloggingStatusBar>
            </View>
        </View>
    )
    return (
        <DetailPhotos userId={userId} plogId={plogId} headerComponent={headerComponent}></DetailPhotos>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerTitle: {
        padding: 10,
        backgroundColor: "white",
        justifyContent: 'center',

    },
    titleText: {
        fontSize: 15,
        marginLeft: 20,
        fontWeight: "bold",
    },
    innerContainerTime: {
        flexDirection: 'row',
        marginTop: 7,
        marginLeft: 20,
        alignItems: 'center',

    },
    date: {
        fontSize: 12,
        color: 'black',
        fontWeight: "500"
    },
    timeStart: {
        fontSize: 12,
        color: "#ABABAB",
    },
    containerMap: {
        height: 250,
        paddingLeft: 10,
        paddingRight: 10
    },
    containerMapIn: {
        flexDirection: "column",
        height: "100%",
        backgroundColor: "white",
    },
    containerState: {
        borderBottomWidth: 5,
        borderColor: "#DDDDDD",
    },
});

export default LogDetail;