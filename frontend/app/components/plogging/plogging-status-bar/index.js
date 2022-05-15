import React, { useState, useEffect, useRef, useCallback } from "react";
import { useWindowDimensions, Text, View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import MapSvg from '../icons/map.svg';
import TimeSvg from '../icons/timer.svg';
import { useDispatch, useSelector } from "react-redux"
import weatherApiInstance from "../../../../utils/weatherAPI";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackSvg from '../icons/back.svg'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axiosInstance from "../../../../utils/API";
//import axiosInstance from "../../../../utils/ApiLocal";
import Config from 'react-native-config'
import AWS from 'aws-sdk';
import { resetPloggingPath } from '../../../actions/action';

const PloggingStatusBar = ({ mm = 0, ss = 0, isPlogging, setTimeSum, timeSumString, setIsSave, setDistSum, handleShowEndPage, saveLogs, islogDetail, logDetailWeather }) => {
  const layout = useWindowDimensions();
  const countInterval = useRef(null);
  const [minutes, setMinutes] = useState(parseInt(mm));
  const [seconds, setSeconds] = useState(parseInt(ss));
  const weatherLoc = useSelector(state => state.weatherLoc);
  const [currWeatherTime, setCurrWeatherTime] = useState(0);
  const curr = new Date();
  const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_curr = new Date(utc + (KR_TIME_DIFF));
  const [temp, setTemp] = useState(20);
  const [weather, setWeather] = useState("weather-sunny");
  const navigation = useNavigation();
  const showEndPage = useSelector(state => state.showPloggingEndPage);
  const isSave = useSelector(state => state.isSave);
  const ploggingPath = useSelector(state => state.ploggingPath);
  const startTime = useSelector(state => state.startTime);
  const images = useSelector(state => state.images);
  const userId = 1; //나중에 리덕스 스토어에서 가져오기
  const distSum = useSelector(state => state.distSum)
  const dispatch = useDispatch();

  var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
  });

  AWS.config.update({
    region: 'ap-northeast-2', // 리전이 서울이면 이거랑 같게
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: Config.IDENTITYPOOLID,
    })
  })

  useEffect(() => {
    countInterval.current = setInterval(() => {
      if (isPlogging) {
        if (parseInt(seconds) >= 0) {
          setSeconds(parseInt(seconds) + 1);
        }
        if (parseInt(seconds) === 59) {
          setMinutes(parseInt(minutes) + 1);
          setSeconds(0);
        }
        if (seconds < 10) setTimeSum(minutes + " : " + 0 + seconds);
        else setTimeSum(minutes + " : " + seconds);
      }
    }, 1000);
    return () => {
      clearInterval(countInterval.current);
    };
  }, [minutes, seconds, isPlogging]);

  useEffect(() => { //10분마다 날씨정보 갱신 연계
    setCurrWeatherTime(parseInt(minutes / 10));
  }, [minutes])

  useEffect(() => {
    if (weatherLoc.length > 1) {
      const year = kr_curr.getFullYear();
      const month = ('0' + (kr_curr.getMonth() + 1)).slice(-2);
      const day = ('0' + kr_curr.getDate()).slice(-2);
      const dateString = year + month + day;

      const hours = ('0' + kr_curr.getHours()).slice(-2);
      const minutes = ('0' + kr_curr.getMinutes()).slice(-2);
      const timeString = hours + minutes;
      let weatherTimeParam = hours + minutes;
      if (parseInt(minutes) <= 40)  // 매시간 40분 후에 api가 제공됨..하..
        weatherTimeParam = (parseInt(hours) - 1) + "" + 50;

      async function getWeatherInfo() {
        await weatherApiInstance.get(`/getUltraSrtNcst?serviceKey=${Config.SERVICEKEY_WEATHER}&pageNo=1&numOfRows=10&dataType=JSON&base_date=${dateString}&base_time=${weatherTimeParam}&nx=${weatherLoc[0]}&ny=${weatherLoc[1]}`)
          .then((response) => {
            if (response.status === 200) {
              organizeWeatherData(response.data.response.body.items.item, parseInt(timeString));
            } else {
              console.log("FAIL");
            }
          })
      }
      getWeatherInfo();
    }
  }, [weatherLoc, currWeatherTime]);

  useEffect(() => {
    if (isSave) {
      const saveLog = async () => {
        try {
          await axiosInstance.post("/ploggings", {
            userId: 1, // 차후 유저 정보로 수정
            plogDist: distSum,
            plogTime: timeSumString,
            plogWeather: weather,
            route: ploggingPath,
            plogDate: (startTime[0] + startTime[1] + "-" + startTime[2]),
          })
            .then(async (response) => {
              if (response.status === 200) {
                console.log("log insert SUCCESS");
                console.log(response.data.data); //플로깅 아이디
                upload(userId, response.data.data); //userId + 플로깅아이디
                await axiosInstance.get(`/ploggings/${userId}`)  // 성공할때만 정보를 다시 가져오기위해
                  .then((response) => {
                    if (response.status === 200) {
                      console.log("저장 후 플로깅 정보 업뎃 성공");
                      saveLogs(response.data.data);
                      setTimeSum("0 : 00");
                      setDistSum(0);
                      dispatch(resetPloggingPath());
                    } else if (response.status === 204) {
                      console.log("저장된 기록이 없습니다") // todo 기록없을때 처리
                    }
                    else {
                      console.log("log insert FAIL " + response.status);
                    }
                  })
                  .catch((response) => { console.log(response); });
                cleanAndGoRecordTab();
              } else {
                console.log("log insert FAIL " + response.status);
              }
            })
            .catch((response) => { console.log(response); });
        } catch (err) { console.log(err); }

      };
      saveLog();
      // cleanAndGoRecordTab();
    }
  }, [isSave])

  const cleanAndGoRecordTab = () => {
    goSaveFalse();
    setStartPage();
    goRecordTab();
  }
  const setStartPage = () => {
    handleShowEndPage(false);
  }
  const goSaveFalse = () => {
    setIsSave(false);
  }
  const goRecordTab = () => {
    navigation.navigate('기록');
  }

  const upload = async (userId, ploggingId) => {
    const promises = images.map(async (img) => {
      const response1 = await fetch(img.uri)
      const blob = await response1.blob()
      var albumPhotosKey = "ploggingLog/" + userId + '/' + ploggingId + '/'
      var photoKey = albumPhotosKey + img.fileName;

      var params = { Bucket: 'plomeet-image', Key: photoKey, Body: blob }
      s3.upload(params, function (err, data) {
        if (err) {
          alert('There was an error uploading your photo: ', err.message);
        }
        // data.Location
        // https://plomeet-image.s3.ap-northeast-2.amazonaws.com/photos/1_3C369038-4102-4887-A8DB-43C42E706340.jpg
        // data.Key
        // photos/1_3C369038-4102-4887-A8DB-43C42E706340.jpg
        console.log(data);
      });
    });

    await Promise.all(promises)
  }



  const organizeWeatherData = (data, time) => {//0 맑음 1 쏘쏘 2 흐림 3 비 4 눈/비 5 눈
    const PTY = data[0].obsrValue;
    const REH = data[1].obsrValue;
    setTemp(data[3].obsrValue);
    if (PTY === "1" || PTY === "5")
      setWeather("weather-pouring");
    else if (PTY === "2" || PTY === "6")
      setWeather("weather-snowy-rainy");
    else if (PTY === "3" || PTY === "7")
      setWeather("weather-snowy-heavy");
    else
      if (REH > 85)
        setWeather("weather-cloudy");
      else if (REH < 75)
        if (time > 600 && time < 1900)
          setWeather("weather-sunny");
        else if (time >= 1900 && time < 2030)
          setWeather("weather-sunset");
        else
          setWeather("weather-night");
      else
        if (time > 600 && time < 1900)
          setWeather("weather-partly-cloudy");
        else
          setWeather("weather-night-partly-cloudy");
  };

  return (
    <View style={styles.container}>
      <PloggingStatusBarBlock width={layout.width}>
        <View style={styles.statusView}>
          <MapSvg width={20} height={20} fill={"#FFF"} />
          <Text style={styles.statusText}>{distSum}km</Text>
        </View>
        <View style={styles.statusView}>
          <TimeSvg width={20} height={20} fill={"#FFF"} />
          <Text style={styles.statusText}>{timeSumString}</Text>
        </View>
        {islogDetail ?
          <View style={styles.statusView}>
            <Icon name={logDetailWeather} size={20} color="#292D32" />
          </View>
          :
          <View style={styles.statusView}>
            <Icon name={weather} size={20} color="#292D32" />
            <Text style={styles.statusText}>{temp}℃</Text>
          </View>
        }


      </PloggingStatusBarBlock>
    </View>
  );
};

export default PloggingStatusBar;


const styles = StyleSheet.create({
  statusView: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 10
  },
  container: {
    flexDirection: "column",
    // height: "15%",
    backgroundColor: "white",
  },
})

const PloggingStatusBarBlock = styled.View`
  display: flex;
  flex-direction: row;
  width: ${props => props.width}px;
  height: 72px;
  background-color: #ffffff;
  padding: 26px 20px 26px 20px;
`

