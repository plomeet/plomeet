import React, { Component, Node, Button, useEffect, useState, useRef } from 'react';
import 'react-native-gesture-handler';
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import RecordStatusBar from './record-status-bar/index'
import LogCalendar from './calendar/index'
import PloggingList from './ploggingList/index'
import axiosInstance from "../../../utils/API";
import { useSelector } from "react-redux"
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-spinkit'
import { useDispatch } from 'react-redux'
import { setFirstPlogging } from '../../actions/badgeAction';

const Record = ({ saveLogs, setListMonth }) => {
    const [plogLists, setPlogLists] = useState([]);
    const savedLogs = useSelector(state => state.savedLogs);
    const listMonth = useSelector(state => state.listMonth);
    const userId = useSelector(state => state.userId);
    const [td, setTd] = useState(0.0);
    const [tt, setTt] = useState("0 : 00");
    const [tc, setTc] = useState(0);
    const [dateArr, setDateArr] = useState([]);
    const [month, setMonth] = useState(0);
    const isFocused = useIsFocused();
    const scrollViewRef = useRef();
    const [showSpinner, setShowSpinner] = useState(true);
    const firstPlogging = useSelector(state => state.firstPlogging);
    const dispatch = useDispatch();
    const [isTotalDistTen, setIsTotalDistTen] = useState(false);

    useEffect(() => {
        if (isFocused) {
            const getSavedLogs = async () => {
                console.log("기록들 가져오기");
                try {
                    await axiosInstance.get(`/ploggings/${userId}`)
                        .then((response) => {
                            if (response.status === 200) {
                                saveLogs(response.data.data);
                            } else if (response.status === 204) {
                                console.log("저장된 기록이 없습니다") // todo 기록없을때 처리
                            }
                            else {
                                console.log("log insert FAIL " + response.status);
                            }
                            setShowSpinner(false);
                        })
                        .catch((response) => { console.log(response); });
                } catch (err) { console.log(err); }
            };

            const checkFirstLog = () => {
                if (firstPlogging) {
                    Alert.alert(
                        "",
                        "'플로깅의 시작' 뱃지 획득!",
                        [
                            {
                                text: '닫기'
                            }
                        ],
                        { cancelable: true }
                    );
                    dispatch(setFirstPlogging(false))
                }
            }
            getSavedLogs();
            checkFirstLog();
        }

    }, [isFocused]);

    useEffect(() => {
        setPlogLists([]);
        if (listMonth.length > 1) {
            const mm = parseInt(listMonth.substring(5, 7));
            setMonth(mm);
            if (savedLogs[0] !== undefined) {
                savedLogs.map((data, i) => {
                    if (i === savedLogs.length - 1) setShowSpinner(false);
                    const min = parseInt(data.plogTime.substring(0, data.plogTime.indexOf(' ')));
                    const sec = parseInt(data.plogTime.substr(-2));
                    let dateString = data.plogDate.substring(0, 7);

                    if (!isNaN(min) && !isNaN(sec) && dateString.length > 1) {
                        dateString = replaceAll(dateString, '/', '-')
                        if (dateString === listMonth) {
                            setPlogLists(plogLists => [...plogLists, data]);
                        }
                    }
                });
            } else {
                setShowSpinner(false);
            }

        }
    }, [listMonth, savedLogs]);

    useEffect(() => {
        if (savedLogs[0] !== undefined) {
            //console.log(typeof savedLogs);
            let totalDist = 0.0;
            let totalMin = 0;
            let totalSec = 0;
            let cnt = 0;
            let dateArray = [];
            savedLogs.map((data) => {
                totalDist += data.plogDist;
                const min = parseInt(data.plogTime.substring(0, data.plogTime.indexOf(' ')));
                const sec = parseInt(data.plogTime.substr(-2));
                let dateString = data.plogDate.substring(0, data.plogDate.indexOf('('));

                if (!isNaN(min) && !isNaN(sec) && dateString.length > 9) {
                    dateString = replaceAll(dateString, '/', '-')
                    dateArray.push(dateString);
                    totalMin += min;
                    totalSec += sec
                    cnt++; //시작하고 바로 종료하면 시간이 0으로 저장됨 이거 이용해서 그 경우는 카운트 안함, 오류를 이용함..ㅋ
                }
            });
            totalMin += parseInt(totalSec / 60);
            totalSec = totalSec % 60;
            let timeStr = totalMin + " : " + totalSec;
            if (totalSec < 10)
                timeStr = totalMin + " : 0" + totalSec;
            if (Math.round(totalDist * 10) % 10 === 0)
                totalDist = Math.round(totalDist * 10) / 10 + ".0";
            else
                totalDist = Math.round(totalDist * 10) / 10
            setTd(totalDist);
            setTt(timeStr);
            setTc(cnt);
            setDateArr(dateArray);
            const now = new Date();
            const dateString = dateFormat(now);
            setListMonth(dateString);

            if (isTotalDistTen) {
                if (totalDist >= 10.0) {
                    Alert.alert(
                        "",
                        "'제법 걸었네요' 뱃지 획득!",
                        [
                            {
                                text: '닫기'
                            }
                        ],
                        { cancelable: true }
                    );

                    saveBadgeTotalDistTen();
                }
            }
        }
    }, [savedLogs]);

    useEffect(() => {
        const checkTotalDistTen = async () => {
            try {
                await axiosInstance.get(`/badges/${userId}/23`)
                    .then((response) => {
                        if (response.status === 200) {
                            console.log("뱃지!!!!", response.data.isOwned)
                            if (!response.data.isOwned) {
                                setIsTotalDistTen(true);
                                console.log("나 누적10키로 뱃지 첨받아봄!")
                            }
                            else {
                                setIsTotalDistTen(false);
                            }
                        } else {
                            console.log("error" + response.status);
                        }
                    })
            }
            catch (err) {
                console.log(err);
            }
        }

        checkTotalDistTen();
    }, [isFocused])


    const saveBadgeTotalDistTen = async () => {
        try {
            await axiosInstance.post('/badges/get', {
                userId: userId,
                badgeId: 23,
            }).then((response) => {
                if (response.status === 201) {
                    console.log("뱃지 획득 성공!!");
                    setIsTotalDistTen(false);
                }
            })
        } catch (error) { console.log(error) }
    }

    const dateFormat = (date) => {  //dateformat 마찬가지
        let month = date.getMonth() + 1;

        month = month >= 10 ? month : '0' + month;

        return date.getFullYear() + '-' + month;
    }


    const replaceAll = (str, search, replace) => { //replaceAll 함수
        return str.split(search).join(replace);
    }


    return (
        <View style={styles.container}>
            <RecordStatusBar td={td} tt={tt} tc={tc} />
            <LogCalendar dateArr={dateArr} setListMonth={setListMonth} setShowSpinner={setShowSpinner} />

            <View style={styles.plogListContainer}>
                <ScrollView ref={scrollViewRef}
                    onContentSizeChange={() => {
                        scrollViewRef.current.scrollToEnd({ animated: false })
                    }}>
                    {
                        plogLists.map((log, index) => {
                            return (
                                <PloggingList key={log.plogId} id={log.plogId} log={log} mm={month} index={index} />
                            )
                        })
                    }
                </ScrollView>
                {showSpinner &&
                    <View style={styles.containerSpinner}>
                        <Spinner isVisible={true} size={50} type={'ThreeBounce'} color={"#1BE58D"} />
                    </View>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
    },
    plogListContainer: {
        flex: 1,
        paddingBottom: 5,
    },
    containerSpinner: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1001,
    },
});

export default Record;