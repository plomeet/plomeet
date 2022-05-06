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
    const startTime = useSelector(state => state.startTime);
    const [endTime, setEndTime] = useState([]);
    const curr = new Date();
    const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + (KR_TIME_DIFF));
    const WEEKDAY = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    const [elapsedTime, setElapsedTime] = useState("");
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

        const year = kr_curr.getFullYear();
        const month = ('0' + (kr_curr.getMonth() + 1)).slice(-2);
        const day = ('0' + kr_curr.getDate()).slice(-2);
        const dateString = year + '/' + month + '/' + day;

        const hours = ('0' + kr_curr.getHours()).slice(-2);
        const minutes = ('0' + kr_curr.getMinutes()).slice(-2);
        const timeString = hours + ':' + minutes;

        const week = WEEKDAY[kr_curr.getDay()];
        setEndTime([dateString, week, timeString, kr_curr]);

        let TimeTaken = kr_curr.getTime() - startTime[3].getTime();

        const hour = parseInt(TimeTaken / 1000 / 60 / 60);
        TimeTaken = TimeTaken - (hour * 1000 * 60 * 60);
        const min = parseInt(TimeTaken / 1000 / 60);
        TimeTaken = TimeTaken - (min * 1000 * 60);
        const sec = parseInt(TimeTaken / 1000);
        let str = "총 ";
        if (hour > 0)
            str += hour + "시간 "
        if (min > 0)
            str += min + "분 "
        if (sec > 0)
            str += sec + "초 "
        str += "플로깅을 했어요"

        if (elapsedTime === "")
            setElapsedTime(str);
    }, []);

    useEffect(() => {
        console.log(startTime);
    }, [startTime]);
    return (<>
        {middle &&
            <View
                style={style.container}
            >
                <View style={style.containerTime} >
                    <View style={style.innerContainerTime} >
                        <Text style={style.date}>{startTime[0]}{startTime[1]}</Text>
                        <Text style={style.timeStart}>{startTime[2]}</Text>
                        <Text style={style.start}>~</Text>
                        {/* <Text style={style.date}>{endTime[0]}{endTime[1]}</Text> */}
                        <Text style={style.time}>{endTime[2]}</Text>
                    </View>
                    <View style={style.innerContainerTime} >
                        <Text style={style.elapsedTime}>{elapsedTime}</Text>
                    </View>
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
        backgroundColor: "white"
    },
    containerTime: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 10,
    },
    innerContainerTime: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    date: {
        fontSize: 15,
        color: 'black',
    },
    timeStart: {
        marginLeft: 20,
        fontSize: 14,
    },
    time: {
        fontSize: 14,
    },
    start: {
        marginLeft: 5,
        marginRight: 5,
        fontSize: 15,
    },
    elapsedTime: {
        fontSize: 18,
        color: 'black',
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