import React, { Component, Node, Button, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { BackHandler, Alert, LogBox, SafeAreaView, Modal, StyleSheet, TextInput, Text, View, FlatList, Image, StatusBar, TouchableOpacity, KeyboardAvoidingView, NativeModules } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Align } from '../plogging/map';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axiosInstance from '../../../utils/API';
import AsyncStorage from '@react-native-community/async-storage';
import PlomeetSpinner from '../../../utils/PlomeetSpinner'
import { setFirstMeeting, setFirstRegister } from '../../actions/badgeAction'

const { StatusBarManager } = NativeModules

LogBox.ignoreAllLogs();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 15,

  },
  searchInput: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 9,
  },
  input: {
    marginHorizontal: 30,
    fontSize: 18,
    borderBottomWidth: 1,
  },
  card: {
    backgroundColor: '#fff',
    flex: 0.48,
    borderRadius: 8,
    marginBottom: 20,
    paddingBottom: 10,
  },
  elevation: {
    elevation: 5,
    shadowColor: '#bbbbbb',
  },
  img: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
    height: 100,
  },
  title: {
    fontSize: 14,
    color: '#313333',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5,
  },
  content: {
    fontSize: 12,
    color: '#000000',
    marginLeft: 7,

  },
  recentKeyWord: {
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 3,
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 65,
    height: 65,
    shadowColor: '#bbbbbb',
  },
  closeButton: {
    height: 42,
    borderRadius: 8,
    backgroundColor: "#1BE58D",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3
  },
  closeSearchModalButton: {
    height: 55,
    backgroundColor: "#1BE58D",
    justifyContent: "center",
    alignItems: "center"
  },
  deleteButton: {
    height: 42,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#1BE58D",
    justifyContent: "center",
    alignItems: "center"
  },
  deleteButtonText: {
    fontSize: 18,
    color: "#1BE58D"
  },
  recentListTxt: {
    fontSize: 14,
    marginTop: 40,
    marginLeft: 25,
    color: "#000"
  },
  buttonText: {
    fontSize: 18,
    color: "#fff"
  },
});

const Home = () => {
  const navigation = useNavigation();
  const [meetingList, setMeetingList] = useState([]);
  const [myMeetingList, setMyMeetingList] = useState([]);
  const [myMeetingListInfo, setMyMeetingListInfo] = useState([]);
  // const [imLeaderList, setImLeaderList] = useState([]);
  const isFocused = useIsFocused();
  const current = getToday(); //오늘 날짜
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const [selectedDate, setSelectedDate] = useState('일시'); //일정 필터
  const [visibleCalendar, setVisibleCalendar] = useState(false); //캘린더 표시 여부
  const [visibleSearch, setVisibleSearch] = useState(false); //캘린더 표시 여부
  const userId = useSelector(state => state.userId);
  const [statusBarHeight, setStatusBarHeight] = useState(-400);
  const [keywordTxt, setKeywordTxt] = useState();
  const [recentKeyWord, setRecentKeyWord] = useState();
  const [showSpinner, setShowSpinner] = useState(true);
  //const [textInputValue, setTextInputValue] = useState();
  const isFirstMeeting = useSelector(state => state.firstMeeting);
  const isFirstRegister = useSelector(state => state.firstRegister);
  const dispatch = useDispatch();

  function deleteDate() {
    setSelectedDate('일시');
    setVisibleCalendar(false);
    getAllMeeting();
  }

  function setDate() {
    for (var i = 0; i < meetingList.length; i++) {
      if (parse(meetingList[i].meetingDate).substring(0, 11) != selectedDate) {
        meetingList.splice(i, 1);
        i--;
      }
    }
    setVisibleCalendar(false)
  }

  function parse(str) {
    var y = str.substr(0, 4);
    var m = str.substr(5, 2);
    var d = str.substr(8, 2);
    var ymd = new Date(y, m - 1, d);
    let day = week[ymd.getDay()];
    var res = m + "월 " + d + "일(" + day + ") " + str.substr(11, 5);
    return res
  }

  async function setKeyWordFunc() {
    setKeyWordList(keywordTxt);
    setVisibleSearch(false);
    await AsyncStorage.getItem('recentKeyword').then(res => {
      if (res) {
        if (keywordTxt === undefined || keywordTxt.length < 1) return;
        let arr = res.split('-')
        if (arr.length >= 12) {
          arr.shift();
        }

        for (var i = 0; i < arr.length; i++) {
          if (arr[i] === keywordTxt) {
            arr.splice(i, 1);
            i--;
          }
        }

        let str = "";
        arr.forEach((data, index) => {
          if (index === 0) {
            str += data;
          } else {
            str += "-";
            str += data;
          }
        })

        AsyncStorage.setItem('recentKeyword', str + "-" + keywordTxt);

      } else {
        AsyncStorage.setItem('recentKeyword', keywordTxt);
      }
    });
  }

  const keywordChangeHandler = (text) => {
    setKeywordTxt(text);
  };

  function resetKeywordFunc() {
    setKeywordTxt();
    getAllMeeting();
  }

  function search() {
    setVisibleSearch(true)
    setKeywordTxt();
    AsyncStorage.getItem('recentKeyword').then(res => {
      if (res) {
        const arr = res.split('-').reverse();
        setRecentKeyWord(arr);
      } else {
        setRecentKeyWord();
      }
    });
    getAllMeeting();
  }
  //모임 정보 세팅
  useEffect(() => {
    getAllMeeting();
    getMyMeeting();
    setKeywordTxt();
  }, [isFocused == true]);

  useEffect(() => {
    getMyMeeting();
  }, [userId]);

  useEffect(() => {
    if (isFocused) { 
      if (isFirstMeeting) { 
        Alert.alert(
          "",
          "'너 내 동료가 되라' 뱃지 획득!",
          [
            {
              text: '닫기'
            }
          ],
          { cancelable: true }
        )
        saveBadgeFirstMeeting();
      }
      if (isFirstRegister) {
        Alert.alert(
          "",
          "'플로밋 해볼까?' 뱃지 획득!",
          [
            {
              text: '닫기'
            }
          ],
          { cancelable: true }
        )
        saveBadgeFirstRegister();
      }
    }
  }, [isFocused])

  const saveBadgeFirstMeeting = async () => { 
    try {
      await axiosInstance.post('badges/get', {
        userId: userId,
        badgeId: 3,
      }).then((response) => { 
        if (response.status === 201) { 
          console.log("뱃지 획득 성공!!");
          dispatch(setFirstMeeting(false));
        }
      })
    } catch(error) {console.log(error)}
  }

  const saveBadgeFirstRegister = async() => {
    try {
      await axiosInstance.post('badges/get', {
        userId: userId,
        badgeId: 6,
      }).then((response) => { 
        if (response.status === 201) { 
          console.log("뱃지 획득 성공!!");
          dispatch(setFirstRegister(false));
        }
      })
    } catch(error) {console.log(error)}
  }

  async function getAllMeeting() {
    try {
      await axiosInstance.get("/meetings/all")
        .then((response) => {
          if (response.status === 200) {
            setMeetingList(response.data);
            console.log("[모임 정보 조회 성공]");
            setShowSpinner(false);
          } else {
            console.log("[모임 정보 조회 실패]]");
          }
        })
        .catch((response) => { console.log(response); });
    } catch (err) { console.log(err); }
  }

  const setKeyWordList = (keyword) => {
    if (keyword && keyword.length > 0) {
      for (var i = 0; i < meetingList.length; i++) {
        if (meetingList[i].meetingName.indexOf(keyword) === -1
          && meetingList[i].meetingPlace.indexOf(keyword) === -1
          && meetingList[i].meetingPlaceDetail.indexOf(keyword) === -1
        ) {
          meetingList.splice(i, 1);
          i--;
        }
      }
    }
  };

  const setTextInputByChip = (txt) => {
    setKeywordTxt(txt);
  }

  useEffect(() => {
    Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
      setStatusBarHeight(statusBarFrameData.height)
    }) : null;
  }, []);

  async function getMyMeeting() {
    try {
      console.log("userID : " + userId)
      await axiosInstance.get("/mymeetings/" + userId)
        .then((response) => {
          if (response.status === 200) {
            var mList = response.data;
            var test = [];
            var testId = [];
            var imLeader = [];

            for (var i = 0; i < mList.length; i++) {
              if (mList[i].isLeader) {
                imLeader.push(mList[i].meetingId.meetingId);
              }
              test.push(mList[i].meetingId);
              testId.push(mList[i].meetingId.meetingId);
            }
            setMyMeetingListInfo(test);
            setMyMeetingList(testId);
            // setImLeaderList(imLeader);
            AsyncStorage.setItem('myMeeting', JSON.stringify(test), () => {
            });
            AsyncStorage.setItem('myMeetingList', JSON.stringify(testId), () => {
            });
            AsyncStorage.setItem('imLeaderList', JSON.stringify(imLeader), () => {
            });
            console.log("[내가 참여한 모임 정보 조회 성공]");
          } else {
            console.log("[내가 참여한 모임 정보 조회 실패]");
            AsyncStorage.setItem('myMeeting', JSON.stringify([]), () => {
            });
            AsyncStorage.setItem('myMeetingList', JSON.stringify([]), () => {
            });
            AsyncStorage.setItem('imLeaderList', JSON.stringify([]), () => {
            });

          }
        })
        .catch((response) => { console.log(response); });
    } catch (err) { console.log(err); }
  }


  const Item = ({ meetingId, meetingDesc, img, title, place, numMember, maxMember, date, index, lat, lng, placeDetail }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('MeetingDetail', { meetingId: meetingId, myMeetingList: myMeetingList })}
      // style={[ index%2===0? {marginRight:20} : {marginRight:0}, styles.card, styles.elevation]}>
      style={[styles.card, styles.elevation]}>
      <Image source={{ uri: img }} style={styles.img} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row} >
        <Icon name='person-outline' size={14} color='#292D32' />
        <Text style={styles.content}>{numMember}/{maxMember}</Text>
        <Icon style={{ marginLeft: 15 }} name='location' size={14} color='#292D32' />
        <Text style={styles.content}>{place}</Text>
      </View>
      <View style={styles.row}>
        <Icon name='md-calendar-sharp' size={14} color='#292D32' />
        <Text style={styles.content}>{date}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item
      img={item.meetingImg}
      title={item.meetingName}
      place={item.meetingPlace}
      numMember={item.memberCnt}
      maxMember={item.memberMax}
      lat={item.lat}
      lng={item.lng}
      placeDetail={item.meetingPlaceDetail}
      date={parse(item.meetingDate)}
      meetingId={item.meetingId}
      meetingDesc={item.meetingDesc}
      index={item.meetingId} />
  );

  return (
    <SafeAreaView style={styles.container}>

      <Modal animationType="slide"
        transparent={false}
        onRequestClose={() => setVisibleCalendar(false)}
        activeOpacity={0.8}
        visible={visibleCalendar}>
        <View style={{
          flex: 1,
          marginHorizontal: 30,
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <DatePicker
            options={{
              mainColor: '#1BE58D',
              borderColor: 'rgba(122, 146, 165, 0.1)',
            }}
            mode="calendar"
            configs={{
              dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
              monthNames: [
                "1월",
                "2월",
                "3월",
                "4월",
                "5월",
                "6월",
                "7월",
                "8월",
                "9월",
                "10월",
                "11월",
                "12월",
              ],
            }}
            minimumDate={current}
            style={{ borderRadius: 10 }}
            onSelectedChange={date => setSelectedDate(parse(date))}
          />
          <View style={styles.row}>
            <TouchableOpacity activeOpacity={0.8} style={[styles.deleteButton, { paddingHorizontal: 30 }]} onPress={() => deleteDate()}><Text style={styles.deleteButtonText}>조건 삭제</Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={[styles.closeButton, { paddingHorizontal: 30 }]} onPress={() => setDate()}><Text style={styles.buttonText}>선택</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide"
        transparent={false}
        activeOpacity={0.8}
        onRequestClose={() => setVisibleSearch(false)}
        visible={visibleSearch}>
        <KeyboardAvoidingView style={styles.container} behavior={"padding"} keyboardVerticalOffset={statusBarHeight - 20}>

          <View style={styles.searchInput}>
            <TextInput
              style={styles.input}
              placeholder="원하는 키워드를 입력해주세요."
              keyboardType='default'
              autoFocus
              maxLength={8}
              autoCapitalize='none'
              returnKeyType='next'
              value={keywordTxt}
              onChangeText={(text) => keywordChangeHandler(text)}
            />
            {visibleSearch && recentKeyWord !== undefined && recentKeyWord.length > 0 ? <>
              <Text style={styles.recentListTxt}>최근검색</Text>
              <View style={[styles.row, { marginLeft: 25 }, { marginBottom: 5 }, { marginTop: 5 }]}>
                {recentKeyWord[0] !== undefined && <Chip style={styles.recentKeyWord} mode="outlined" selectedColor='#232732' onPress={() => setTextInputByChip(recentKeyWord[0])}><Text>{recentKeyWord[0]}</Text></Chip>}
                {recentKeyWord[1] !== undefined && <Chip style={styles.recentKeyWord} mode="outlined" selectedColor='#232732' onPress={() => setTextInputByChip(recentKeyWord[1])}><Text>{recentKeyWord[1]}</Text></Chip>}
                {recentKeyWord[2] !== undefined && <Chip style={styles.recentKeyWord} mode="outlined" selectedColor='#232732' onPress={() => setTextInputByChip(recentKeyWord[2])}><Text>{recentKeyWord[2]}</Text></Chip>}
              </View>
              <View style={[styles.row, { marginLeft: 25 }, { marginBottom: 5 }, { marginTop: 5 }]}>
                {recentKeyWord[3] !== undefined && <Chip style={styles.recentKeyWord} mode="outlined" selectedColor='#232732' onPress={() => setTextInputByChip(recentKeyWord[3])}><Text>{recentKeyWord[3]}</Text></Chip>}
                {recentKeyWord[4] !== undefined && <Chip style={styles.recentKeyWord} mode="outlined" selectedColor='#232732' onPress={() => setTextInputByChip(recentKeyWord[4])}><Text>{recentKeyWord[4]}</Text></Chip>}
                {recentKeyWord[5] !== undefined && <Chip style={styles.recentKeyWord} mode="outlined" selectedColor='#232732' onPress={() => setTextInputByChip(recentKeyWord[5])}><Text>{recentKeyWord[5]}</Text></Chip>}
              </View>
              <View style={[styles.row, { marginLeft: 25 }, { marginBottom: 5 }, { marginTop: 5 }]}>
                {recentKeyWord[6] !== undefined && <Chip style={styles.recentKeyWord} mode="outlined" selectedColor='#232732' onPress={() => setTextInputByChip(recentKeyWord[6])}><Text>{recentKeyWord[6]}</Text></Chip>}
                {recentKeyWord[7] !== undefined && <Chip style={styles.recentKeyWord} mode="outlined" selectedColor='#232732' onPress={() => setTextInputByChip(recentKeyWord[7])}><Text>{recentKeyWord[7]}</Text></Chip>}
                {recentKeyWord[8] !== undefined && <Chip style={styles.recentKeyWord} mode="outlined" selectedColor='#232732' onPress={() => setTextInputByChip(recentKeyWord[8])}><Text>{recentKeyWord[8]}</Text></Chip>}
              </View>
              <View style={[styles.row, { marginLeft: 25 }, { marginBottom: 5 }, { marginTop: 5 }]}>
                {recentKeyWord[9] !== undefined && <Chip style={styles.recentKeyWord} mode="outlined" selectedColor='#232732' onPress={() => setTextInputByChip(recentKeyWord[9])}><Text>{recentKeyWord[9]}</Text></Chip>}
                {recentKeyWord[10] !== undefined && <Chip style={styles.recentKeyWord} mode="outlined" selectedColor='#232732' onPress={() => setTextInputByChip(recentKeyWord[10])}><Text>{recentKeyWord[10]}</Text></Chip>}
                {recentKeyWord[11] !== undefined && <Chip style={styles.recentKeyWord} mode="outlined" selectedColor='#232732' onPress={() => setTextInputByChip(recentKeyWord[11])}><Text>{recentKeyWord[11]}</Text></Chip>}
              </View>
            </>
              :
              <></>
            }
          </View>
          <View style={{ flex: 0.5 }} />
          <TouchableOpacity activeOpacity={0.8} style={[styles.closeSearchModalButton, { paddingHorizontal: 30 }]} onPress={() => setKeyWordFunc()}>
            <Text style={styles.buttonText}>검색</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>

      <View style={[styles.row, { marginLeft: 20 }, { marginBottom: 10 }, { marginTop: 10 }]}>
        <Chip style={{ marginRight: 10 }} icon="card-search-outline" mode="outlined" selectedColor="#232732" onPress={() => search()}><Text>검색</Text></Chip>
        {keywordTxt !== undefined && keywordTxt.length > 0 && <Chip style={{ marginRight: 10 }} icon="close" mode="outlined" selectedColor="#232732" onPress={() => resetKeywordFunc()}><Text>{keywordTxt}</Text></Chip>}
        <Chip style={{ marginRight: 10 }} icon="clock" mode="outlined" selectedColor='#232732' onPress={() => setVisibleCalendar(true)}><Text>{selectedDate}</Text></Chip>
        <Chip icon="align-vertical-center" mode="outlined" selectedColor='#232732' onPress={() => console.log('정렬')}><Text>정렬</Text></Chip>
      </View>
      {showSpinner &&
        <PlomeetSpinner isVisible={showSpinner} size={50} />
      }
      <FlatList
        columnWrapperStyle={[{ justifyContent: 'space-between' }, { marginHorizontal: 20 }]}
        data={meetingList}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.meetingId}
        windowSize={50}
        numColumns={2}
      />
      <TouchableOpacity onPress={() => navigation.navigate('OpenMeeting')} activeOpacity={0.5} style={styles.TouchableOpacityStyle} >
        <Image source={{ uri: 'https://i.postimg.cc/v8p4fK53/plus-btn.png' }}
          style={styles.FloatingButtonStyle} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Home;